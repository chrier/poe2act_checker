import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { actGuides } from './data/acts'
import { issueItems } from './data/issues'
import {
  ISSUE_REACTION_EMOJIS,
  ISSUE_REACTIONS_ENABLED,
  addIssueReaction,
  fetchIssueReactionCounts,
  getReactionKey,
  readLocalReactedKeys,
  removeIssueReaction,
  writeLocalReactedKeys,
  type IssueReactionCounts,
  type IssueReactionEmoji,
} from './lib/reactions'
import { VISITOR_PRESENCE_ENABLED, subscribeVisitorPresence } from './lib/visitorPresence'
import type { IssueItem, IssueTab } from './types'

const STORAGE_KEY = 'poe2act_checker.completed_steps'
const LOCAL_REACTION_COUNTS_KEY = 'poe2act_checker.issue_reactions.local_counts'
const UPDATE_TIP_PREFIX = '[0.5 동선 개선]'
const WEAPON_TIP_PREFIX = '[무기 제작]'
const POE2_LAUNCH_AT = new Date('2026-05-30T05:00:00+09:00').getTime()
const DAUM_POE2_URL = 'https://pathofexile2.game.daum.net/main'
const ISSUE_TABS: IssueTab[] = ['전체', '공식', '커뮤니티', '빌드', '도구', '이슈', '잡똥글']

function readCompletedSteps() {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return new Set<string>()

  try {
    const parsed = JSON.parse(raw)
    return new Set(Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [])
  } catch {
    return new Set<string>()
  }
}

function readLocalReactionCounts() {
  const raw = window.localStorage.getItem(LOCAL_REACTION_COUNTS_KEY)
  if (!raw) return {}

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, number] => typeof entry[0] === 'string' && typeof entry[1] === 'number'),
    )
  } catch {
    return {}
  }
}

function writeLocalReactionCounts(counts: Record<string, number>) {
  window.localStorage.setItem(LOCAL_REACTION_COUNTS_KEY, JSON.stringify(counts))
}

function formatLaunchRemaining(now: number) {
  const remaining = POE2_LAUNCH_AT - now

  if (remaining <= 0) {
    return '오픈됨'
  }

  const totalSeconds = Math.floor(remaining / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const two = (value: number) => String(value).padStart(2, '0')

  return `${days}일 ${two(hours)}:${two(minutes)}:${two(seconds)}`
}

function issueMatchesSearch(issue: IssueItem, search: string) {
  const normalizedSearch = search.trim().toLocaleLowerCase()
  if (!normalizedSearch) return true

  const searchableText = [
    issue.category,
    issue.title,
    issue.quote,
    issue.summary,
    issue.summaryMarkdown,
    issue.imageUrl,
    issue.sourceName,
    issue.publishedAt,
    ...(issue.tags ?? []),
  ]
    .filter(Boolean)
    .join('\n')
    .toLocaleLowerCase()

  return searchableText.includes(normalizedSearch)
}

function getIssueSourceLabel(issue: IssueItem) {
  const sourceText = `${issue.sourceName} ${issue.sourceUrl}`.toLocaleLowerCase()

  if (issue.sourceType === 'youtube' || sourceText.includes('youtube.com') || sourceText.includes('youtu.be')) {
    return 'Youtube'
  }
  if (sourceText.includes('reddit.com') || sourceText.includes('r/pathofexile2')) {
    return 'Reddit'
  }
  if (sourceText.includes('dcinside.com') || sourceText.includes('디시인사이드')) {
    return 'DCInside'
  }
  if (sourceText.includes('arca.live') || sourceText.includes('arca')) {
    return 'Arca'
  }
  if (sourceText.includes('pcgamer.com') || sourceText.includes('pc gamer')) {
    return 'PC Gamer'
  }
  if (sourceText.includes('pathofexile.com') || sourceText.includes('path of exile')) {
    return 'Official'
  }

  return issue.sourceName
}

function renderIssueSummary(issue: IssueItem) {
  if (!issue.summaryMarkdown) {
    return <p className="issue-summary">{issue.summary}</p>
  }

  const blocks = issue.summaryMarkdown
    .trim()
    .split(/\n(?=## )/)
    .map((block) => block.trim())
    .filter(Boolean)

  return (
    <div className="issue-markdown-summary" aria-label="중점 내용">
      {blocks.map((block) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean)
        const title = lines[0].replace(/^##\s+/, '')
        const items = lines.slice(1).map((line) => line.replace(/^-\s+/, ''))

        return (
          <section className="issue-markdown-section" key={title}>
            <h4>{title}</h4>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

function App() {
  const [activeAct, setActiveAct] = useState(actGuides[0].act)
  const [activeView, setActiveView] = useState<'checklist' | 'issues'>('checklist')
  const [activeIssueTab, setActiveIssueTab] = useState<IssueTab>('전체')
  const [issueSearch, setIssueSearch] = useState('')
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => readCompletedSteps())
  const [issueReactionCounts, setIssueReactionCounts] = useState<IssueReactionCounts>({})
  const [localIssueReactionCounts, setLocalIssueReactionCounts] = useState<Record<string, number>>(() => readLocalReactionCounts())
  const [reactedIssueKeys, setReactedIssueKeys] = useState<Set<string>>(() => readLocalReactedKeys())
  const [pendingReactionKey, setPendingReactionKey] = useState<string | null>(null)
  const [reactionLoadFailed, setReactionLoadFailed] = useState(false)
  const [showVisitorCount, setShowVisitorCount] = useState(false)
  const [visitorCount, setVisitorCount] = useState(1)
  const [now, setNow] = useState(() => Date.now())

  const currentGuide = actGuides.find((guide) => guide.act === activeAct) ?? actGuides[0]
  const completedCount = currentGuide.steps.filter((step) => completedSteps.has(step.id)).length
  const progressPercent = Math.round((completedCount / currentGuide.steps.length) * 100)
  const visibleIssueItems = useMemo(
    () => issueItems.filter((issue) => !issue.hidden).sort((a, b) => b.issueNumber - a.issueNumber),
    [],
  )
  const issueTabCounts = useMemo(
    () =>
      ISSUE_TABS.reduce<Record<IssueTab, number>>(
        (counts, tab) => ({
          ...counts,
          [tab]: tab === '전체' ? visibleIssueItems.length : visibleIssueItems.filter((issue) => issue.issueTab === tab).length,
        }),
        { 전체: 0, 공식: 0, 커뮤니티: 0, 빌드: 0, 도구: 0, 이슈: 0, 잡똥글: 0 },
      ),
    [visibleIssueItems],
  )
  const filteredIssueItems = useMemo(
    () =>
      visibleIssueItems.filter(
        (issue) => (activeIssueTab === '전체' || issue.issueTab === activeIssueTab) && issueMatchesSearch(issue, issueSearch),
      ),
    [activeIssueTab, issueSearch, visibleIssueItems],
  )

  const nextStep = useMemo(
    () => currentGuide.steps.find((step) => !completedSteps.has(step.id)),
    [completedSteps, currentGuide.steps],
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSteps]))
  }, [completedSteps])

  useEffect(() => {
    if (!ISSUE_REACTIONS_ENABLED) return

    let isMounted = true

    fetchIssueReactionCounts()
      .then((counts) => {
        if (!isMounted) return
        setIssueReactionCounts(counts)
        setReactionLoadFailed(false)
      })
      .catch(() => {
        if (isMounted) setReactionLoadFailed(true)
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    writeLocalReactedKeys(reactedIssueKeys)
  }, [reactedIssueKeys])

  useEffect(() => {
    writeLocalReactionCounts(localIssueReactionCounts)
  }, [localIssueReactionCounts])

  useEffect(() => {
    if (!VISITOR_PRESENCE_ENABLED) return
    return subscribeVisitorPresence((count) => setVisitorCount(Math.max(count, 1)))
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  function toggleStep(stepId: string) {
    setCompletedSteps((previous) => {
      const next = new Set(previous)
      if (next.has(stepId)) {
        next.delete(stepId)
      } else {
        next.add(stepId)
      }
      return next
    })
  }

  function resetCurrentAct() {
    const currentStepIds = new Set(currentGuide.steps.map((step) => step.id))
    setCompletedSteps((previous) => {
      const next = new Set(previous)
      currentStepIds.forEach((stepId) => next.delete(stepId))
      return next
    })
  }

  async function handleIssueReaction(issueId: string, emoji: IssueReactionEmoji, hadReacted: boolean) {
    if (!ISSUE_REACTIONS_ENABLED || pendingReactionKey) return

    const reactionKey = getReactionKey(issueId, emoji)
    const countDelta = hadReacted ? -1 : 1
    const currentDisplayCount = localIssueReactionCounts[reactionKey] ?? issueReactionCounts[issueId]?.[emoji] ?? 0
    const nextDisplayCount = Math.max(currentDisplayCount + countDelta, 0)

    setPendingReactionKey(reactionKey)
    setLocalIssueReactionCounts((previous) => ({
      ...previous,
      [reactionKey]: nextDisplayCount,
    }))
    setIssueReactionCounts((previous) => ({
      ...previous,
      [issueId]: {
        ...previous[issueId],
        [emoji]: nextDisplayCount,
      },
    }))
    setReactedIssueKeys((previous) => {
      const next = new Set(previous)
      if (hadReacted) {
        next.delete(reactionKey)
      } else {
        next.add(reactionKey)
      }
      return next
    })

    try {
      if (hadReacted) {
        await removeIssueReaction(issueId, emoji)
      } else {
        const result = await addIssueReaction(issueId, emoji)
        if (result.alreadyReacted) {
          const latestCounts = await fetchIssueReactionCounts()
          setIssueReactionCounts(latestCounts)
          setLocalIssueReactionCounts((previous) => {
            const next = { ...previous }
            delete next[reactionKey]
            return next
          })
        }
      }
      setReactionLoadFailed(false)
    } catch {
      if (!hadReacted) {
        setIssueReactionCounts((previous) => ({
          ...previous,
          [issueId]: {
            ...previous[issueId],
            [emoji]: currentDisplayCount,
          },
        }))
        setLocalIssueReactionCounts((previous) => ({
          ...previous,
          [reactionKey]: currentDisplayCount,
        }))
        setReactedIssueKeys((previous) => {
          const next = new Set(previous)
          next.delete(reactionKey)
          return next
        })
        setReactionLoadFailed(true)
      }
    } finally {
      setPendingReactionKey(null)
    }
  }

  return (
    <main className={`app-shell ${activeView === 'issues' ? 'theme-issues' : `theme-act-${currentGuide.act}`}`}>
      <header className="app-header">
        <div className="header-title-row">
          <div className="header-title-copy">
            <h1>
              poe2act_checker
              <button
                aria-label="실시간 접속자 수 표시"
                className={showVisitorCount ? 'visitor-count-secret active' : 'visitor-count-secret'}
                onClick={() => setShowVisitorCount((previous) => !previous)}
                type="button"
              >
                {showVisitorCount ? (
                  <span>{VISITOR_PRESENCE_ENABLED ? `접속 ${visitorCount}` : '접속 --'}</span>
                ) : (
                  <span aria-hidden="true">·</span>
                )}
              </button>
            </h1>
            <p className="launch-note">
              0.5.0 한국시간 <span>5월 30일 오전 5시 오픈</span> · 잠컨 추천 3시 기상
            </p>
          </div>
          <div className="top-action-panel" aria-label="POE2 오픈 카운트다운">
            <div className="launch-countdown">
              <span>0.5.0 오픈까지</span>
              <strong>{formatLaunchRemaining(now)}</strong>
            </div>
          </div>
        </div>
      </header>

      <nav className="act-tabs" aria-label="페이지 및 Act 선택">
        {actGuides.map((guide) => (
          <button
            className={activeView === 'checklist' && guide.act === activeAct ? 'active' : ''}
            key={guide.act}
            onClick={() => {
              setActiveView('checklist')
              setActiveAct(guide.act)
            }}
            type="button"
          >
            {guide.title}
          </button>
        ))}
        <div className="top-action-buttons" aria-label="POE2 바로가기와 이슈 페이지">
          <a className="daum-home-link" href={DAUM_POE2_URL} rel="noreferrer" target="_blank">
            Daum POE2
          </a>
          <button
            className={activeView === 'issues' ? 'issue-tab active' : 'issue-tab'}
            onClick={() => setActiveView('issues')}
            type="button"
          >
            POE2 이슈
          </button>
        </div>
      </nav>

      {activeView === 'checklist' ? (
        <>
          <section className="progress-card" aria-label="진행률">
        <div className="progress-summary">
          <div className="progress-title-row">
            <strong>{currentGuide.title}</strong>
            <button
              className="reset-act-button"
              disabled={completedCount === 0}
              onClick={resetCurrentAct}
              type="button"
            >
              체크 리셋
            </button>
          </div>
          <span>
            {completedCount} / {currentGuide.steps.length} 완료
          </span>
        </div>
        <div className="progress-bar" aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <p>{nextStep ? `다음 진행: ${nextStep.title}` : '이 액트의 모든 항목을 완료했습니다.'}</p>
      </section>

      <section className="step-list" aria-label={`${currentGuide.title} 진행 순서`}>
        {currentGuide.steps.map((step, index) => {
          const isDone = completedSteps.has(step.id)
          const updateTips = (step.tips ?? [])
            .filter((tip) => tip.startsWith(UPDATE_TIP_PREFIX))
            .map((tip) => tip.replace(UPDATE_TIP_PREFIX, '').trim())
          const weaponTips = (step.tips ?? [])
            .filter((tip) => tip.startsWith(WEAPON_TIP_PREFIX))
            .map((tip) => tip.replace(WEAPON_TIP_PREFIX, '').trim())
          const normalTips = (step.tips ?? []).filter(
            (tip) => !tip.startsWith(UPDATE_TIP_PREFIX) && !tip.startsWith(WEAPON_TIP_PREFIX),
          )
          const hasUpdateTips = updateTips.length > 0
          const hasWeaponTips = weaponTips.length > 0

          return (
            <article className={isDone ? 'step-card done' : 'step-card'} key={step.id}>
              <label className="step-title">
                <input
                  checked={isDone}
                  onChange={() => toggleStep(step.id)}
                  type="checkbox"
                />
                <span className="step-number">{index + 1}</span>
                <span>{step.title}</span>
              </label>

              <div className="step-content">
                <aside
                  className={hasUpdateTips ? 'update-tip-box' : 'update-tip-box empty'}
                  aria-hidden={!hasUpdateTips}
                  aria-label={hasUpdateTips ? '동선 개선 추가 팁' : undefined}
                >
                  {hasUpdateTips && (
                    <>
                      <h2>추가 팁</h2>
                      <ul>
                        {updateTips.map((tip) => (
                          <li key={tip}>{tip}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </aside>

                <div className="step-main-content">
                  <div>
                    <h2>주요 보상 / 목표</h2>
                    <ul className="reward-list">
                      {step.rewards.map((reward) => (
                        <li key={reward}>{reward}</li>
                      ))}
                    </ul>
                  </div>

                  {step.next && (
                    <p className="next-route">
                      <span>다음</span>
                      {step.next}
                    </p>
                  )}

                  {normalTips.length > 0 && (
                    <div className="tip-box">
                      <h2>팁</h2>
                      <ul>
                        {normalTips.map((tip) => (
                          <li key={tip}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <aside
                  className={hasWeaponTips ? 'weapon-tip-box' : 'weapon-tip-box empty'}
                  aria-hidden={!hasWeaponTips}
                  aria-label={hasWeaponTips ? '무기 제작 팁' : undefined}
                >
                  {hasWeaponTips && (
                    <>
                      <h2>무기 제작</h2>
                      <ul>
                        {weaponTips.map((tip) => (
                          <li key={tip}>{tip}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </aside>
              </div>
            </article>
          )
        })}
      </section>
        </>
      ) : (
        <section className="issue-page" aria-label="POE2 이슈">
          <div className="issue-controls" aria-label="POE2 이슈 필터와 검색">
            <div className="issue-subtabs" role="tablist" aria-label="이슈 분류">
              {ISSUE_TABS.map((tab) => (
                <button
                  aria-selected={activeIssueTab === tab}
                  className={activeIssueTab === tab ? 'active' : ''}
                  key={tab}
                  onClick={() => setActiveIssueTab(tab)}
                  role="tab"
                  type="button"
                >
                  <span>{tab}</span>
                  <strong>{issueTabCounts[tab]}</strong>
                </button>
              ))}
            </div>
            <label className="issue-search">
              <span>본문 검색</span>
              <input
                onChange={(event) => setIssueSearch(event.target.value)}
                placeholder="제목, 본문, 태그 검색"
                type="search"
                value={issueSearch}
              />
            </label>
          </div>

          {filteredIssueItems.length === 0 ? (
            <div className="issue-empty-state">
              <strong>표시할 글이 없습니다.</strong>
              <p>다른 하위 탭을 선택하거나 검색어를 지워보세요.</p>
            </div>
          ) : (
            <div className="issue-list">
              {filteredIssueItems.map((issue) => (
                <article className="issue-card" key={issue.id}>
                <div className="issue-card-header">
                  <div>
                    <span className="issue-category">{issue.category}</span>
                    <h3>{issue.title}</h3>
                  </div>
                  <div className="issue-header-actions">
                    <span className="issue-status">{getIssueSourceLabel(issue)}</span>
                    <a className="issue-source-link" href={issue.sourceUrl} rel="noreferrer" target="_blank">
                      <span aria-hidden="true">↗</span>
                      원문 보기
                    </a>
                  </div>
                </div>

                <div className="issue-card-body">
                  {issue.sourceType === 'youtube' && issue.videoEmbedUrl && (
                    <div className="issue-video-frame">
                      <iframe
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        src={issue.videoEmbedUrl}
                        title={`${issue.title} 영상`}
                      />
                    </div>
                  )}

                  {issue.imageUrl && (
                    <figure className="issue-image-frame">
                      <img alt={`${issue.title} 이미지`} src={issue.imageUrl} />
                    </figure>
                  )}

                  <blockquote>{issue.quote}</blockquote>
                  {renderIssueSummary(issue)}

                  {issue.tags && issue.tags.length > 0 && (
                    <div className="issue-tags" aria-label="태그">
                      {issue.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="issue-reactions" aria-label="익명 공개 반응">
                    <span className="issue-reactions-label">반응</span>
                    <div className="issue-reaction-buttons">
                      {ISSUE_REACTION_EMOJIS.map((emoji) => {
                        const reactionKey = getReactionKey(issue.id, emoji)
                        const hasReacted = reactedIssueKeys.has(reactionKey)
                        const isPending = pendingReactionKey === reactionKey
                        const count = localIssueReactionCounts[reactionKey] ?? issueReactionCounts[issue.id]?.[emoji] ?? 0

                        return (
                          <button
                            aria-pressed={hasReacted}
                            className={hasReacted ? 'issue-reaction-button active' : 'issue-reaction-button'}
                            disabled={!ISSUE_REACTIONS_ENABLED || (Boolean(pendingReactionKey) && pendingReactionKey !== reactionKey)}
                            key={emoji}
                            onClick={() => handleIssueReaction(issue.id, emoji, hasReacted)}
                            title={
                              !ISSUE_REACTIONS_ENABLED
                                ? 'Supabase 설정 후 공개 반응이 저장됩니다'
                                : hasReacted
                                  ? `${emoji} 반응 취소`
                                  : `${emoji} 반응 남기기`
                            }
                            type="button"
                          >
                            <span aria-hidden="true">{emoji}</span>
                            <strong>{isPending ? '…' : count}</strong>
                          </button>
                        )
                      })}
                    </div>
                    {!ISSUE_REACTIONS_ENABLED && <small>Supabase 환경 변수 설정 후 공개 카운트가 저장됩니다.</small>}
                    {ISSUE_REACTIONS_ENABLED && reactionLoadFailed && <small>반응 저장/불러오기에 실패했습니다.</small>}
                  </div>
                </div>

                <div className="issue-source-row">
                  <span>{issue.publishedAt ? `${issue.publishedAt} · ` : ''}{issue.sourceName}</span>
                  <span className="issue-number">#{String(issue.issueNumber).padStart(3, '0')}</span>
                </div>
              </article>
              ))}
            </div>
          )}
        </section>
)}

      <button
        aria-label="최상단으로 이동"
        className="scroll-top-button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        type="button"
      >
        ↑
      </button>
    </main>
  )
}

export default App
