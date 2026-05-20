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
      [row.emoji]: Number(row.count) || 0,
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
