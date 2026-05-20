import { SUPABASE_ENABLED, getSupabaseRestHeaders, getSupabaseRestUrl } from './supabaseClient'

export const ISSUE_REACTION_EMOJIS = ['👍', '👀', '😂', '😮', '🔥', '💀'] as const

export type IssueReactionEmoji = (typeof ISSUE_REACTION_EMOJIS)[number]
export type IssueReactionCounts = Record<string, Partial<Record<IssueReactionEmoji, number>>>

export const ISSUE_REACTIONS_ENABLED = SUPABASE_ENABLED

const ANON_ID_KEY = 'poe2act_checker.issue_reactions.anon_id'
const LOCAL_REACTIONS_KEY = 'poe2act_checker.issue_reactions.clicked'

type SupabaseReactionRow = {
  issue_id: string
  emoji: IssueReactionEmoji
  count: number
}

const ISSUE_REACTION_RESET_BASELINE: IssueReactionCounts = {
  'arca-fulmination-wrath-sceptre-usage': { '👍': 1 },
  'pcgamer-return-of-the-ancients-last-major-update-before-1-0': { '👍': 1, '👀': 1 },
  'reddit-nerf-tier-list': { '👍': 1, '👀': 1, '😂': 1, '😮': 1, '🔥': 1, '💀': 1 },
  'youtube-expedition-exploring-the-ocean': { '👍': 3, '👀': 1, '😂': 1, '😮': 1, '🔥': 1, '💀': 1 },
}

function getResetBaseline(issueId: string, emoji: IssueReactionEmoji) {
  return ISSUE_REACTION_RESET_BASELINE[issueId]?.[emoji] ?? 0
}

function getDisplayReactionCount(issueId: string, emoji: IssueReactionEmoji, rawCount: number) {
  return Math.max(rawCount - getResetBaseline(issueId, emoji), 0)
}

function getHeaders() {
  return getSupabaseRestHeaders()
}

function isIssueReactionEmoji(value: unknown): value is IssueReactionEmoji {
  return typeof value === 'string' && ISSUE_REACTION_EMOJIS.includes(value as IssueReactionEmoji)
}

export function getReactionKey(issueId: string, emoji: IssueReactionEmoji) {
  return `${issueId}:${emoji}`
}

export function readLocalReactedKeys() {
  const raw = window.localStorage.getItem(LOCAL_REACTIONS_KEY)
  if (!raw) return new Set<string>()

  try {
    const parsed = JSON.parse(raw)
    return new Set(Array.isArray(parsed) ? parsed.filter((key) => typeof key === 'string') : [])
  } catch {
    return new Set<string>()
  }
}

export function writeLocalReactedKeys(keys: Set<string>) {
  window.localStorage.setItem(LOCAL_REACTIONS_KEY, JSON.stringify([...keys]))
}

export function getOrCreateAnonymousReactionId() {
  const existing = window.localStorage.getItem(ANON_ID_KEY)
  if (existing) return existing

  const nextId = window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
  window.localStorage.setItem(ANON_ID_KEY, nextId)
  return nextId
}

export async function fetchIssueReactionCounts() {
  if (!ISSUE_REACTIONS_ENABLED) return {}

  const url = getSupabaseRestUrl('/rest/v1/issue_reaction_totals?select=issue_id,emoji,count')
  if (!url) return {}

  const response = await fetch(url, { headers: getHeaders() })

  if (!response.ok) {
    throw new Error(`Failed to load issue reactions: ${response.status}`)
  }

  const rows = (await response.json()) as SupabaseReactionRow[]

  return rows.reduce<IssueReactionCounts>((counts, row) => {
    if (!row.issue_id || !isIssueReactionEmoji(row.emoji)) return counts

    counts[row.issue_id] = {
      ...counts[row.issue_id],
      [row.emoji]: getDisplayReactionCount(row.issue_id, row.emoji, Number(row.count) || 0),
    }
    return counts
  }, {})
}

export async function addIssueReaction(issueId: string, emoji: IssueReactionEmoji) {
  if (!ISSUE_REACTIONS_ENABLED) {
    throw new Error('Issue reactions are not configured')
  }

  const url = getSupabaseRestUrl('/rest/v1/issue_reaction_votes')
  if (!url) {
    throw new Error('Issue reactions are not configured')
  }

  const response = await fetch(url, {
    body: JSON.stringify({
      anon_id: getOrCreateAnonymousReactionId(),
      emoji,
      issue_id: issueId,
    }),
    headers: {
      ...getHeaders(),
      Prefer: 'return=minimal',
    },
    method: 'POST',
  })

  if (response.status === 409) {
    return { alreadyReacted: true }
  }

  if (!response.ok) {
    throw new Error(`Failed to add issue reaction: ${response.status}`)
  }

  return { alreadyReacted: false }
}

export async function removeIssueReaction(issueId: string, emoji: IssueReactionEmoji) {
  if (!ISSUE_REACTIONS_ENABLED) {
    throw new Error('Issue reactions are not configured')
  }

  const rpcUrl = getSupabaseRestUrl('/rest/v1/rpc/delete_issue_reaction_vote')
  if (!rpcUrl) {
    throw new Error('Issue reactions are not configured')
  }

  const rpcResponse = await fetch(rpcUrl, {
    body: JSON.stringify({
      p_anon_id: getOrCreateAnonymousReactionId(),
      p_emoji: emoji,
      p_issue_id: issueId,
    }),
    headers: {
      ...getHeaders(),
      Prefer: 'return=minimal',
    },
    method: 'POST',
  })

  if (rpcResponse.ok) return

  if (rpcResponse.status !== 404) {
    throw new Error(`Failed to remove issue reaction: ${rpcResponse.status}`)
  }

  await removeIssueReactionWithRestFallback(issueId, emoji)
}

async function removeIssueReactionWithRestFallback(issueId: string, emoji: IssueReactionEmoji) {
  const anonId = getOrCreateAnonymousReactionId()
  const voteParams = new URLSearchParams({
    anon_id: `eq.${anonId}`,
    emoji: `eq.${emoji}`,
    issue_id: `eq.${issueId}`,
  })
  const voteUrl = getSupabaseRestUrl(`/rest/v1/issue_reaction_votes?${voteParams.toString()}`)
  if (!voteUrl) {
    throw new Error('Issue reactions are not configured')
  }

  const deleteResponse = await fetch(voteUrl, {
    headers: {
      ...getHeaders(),
      Prefer: 'return=minimal',
    },
    method: 'DELETE',
  })

  if (!deleteResponse.ok) {
    throw new Error(`Failed to remove issue reaction: ${deleteResponse.status}`)
  }

  await decrementIssueReactionTotalFallback(issueId, emoji)
}

async function decrementIssueReactionTotalFallback(issueId: string, emoji: IssueReactionEmoji) {
  const latestCounts = await fetchIssueReactionCounts()
  const nextCount = Math.max((latestCounts[issueId]?.[emoji] ?? 0) - 1, 0)
  const totalParams = new URLSearchParams({
    emoji: `eq.${emoji}`,
    issue_id: `eq.${issueId}`,
  })
  const totalUrl = getSupabaseRestUrl(`/rest/v1/issue_reaction_totals?${totalParams.toString()}`)
  if (!totalUrl) {
    throw new Error('Issue reactions are not configured')
  }

  const totalResponse = await fetch(totalUrl, {
    body: JSON.stringify({ count: nextCount }),
    headers: {
      ...getHeaders(),
      Prefer: 'return=minimal',
    },
    method: 'PATCH',
  })

  if (!totalResponse.ok) {
    throw new Error(`Failed to update issue reaction total: ${totalResponse.status}`)
  }
}
