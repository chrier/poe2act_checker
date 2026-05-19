import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { actGuides } from './data/acts'
import { issueItems } from './data/issues'
import type { IssueItem } from './types'

const STORAGE_KEY = 'poe2act_checker.completed_steps'
const UPDATE_TIP_PREFIX = '[0.5 동선 개선]'
const WEAPON_TIP_PREFIX = '[무기 제작]'
const POE2_LAUNCH_AT = new Date('2026-05-30T05:00:00+09:00').getTime()
const DAUM_POE2_URL = 'https://pathofexile2.game.daum.net/main'

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
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => readCompletedSteps())
  const [now, setNow] = useState(() => Date.now())

  const currentGuide = actGuides.find((guide) => guide.act === activeAct) ?? actGuides[0]
  const completedCount = currentGuide.steps.filter((step) => completedSteps.has(step.id)).length
  const progressPercent = Math.round((completedCount / currentGuide.steps.length) * 100)

  const nextStep = useMemo(
    () => currentGuide.steps.find((step) => !completedSteps.has(step.id)),
    [completedSteps, currentGuide.steps],
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSteps]))
  }, [completedSteps])

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

  return (
    <main className={`app-shell ${activeView === 'issues' ? 'theme-issues' : `theme-act-${currentGuide.act}`}`}>
      <header className="app-header">
        <div className="header-title-row">
          <div className="header-title-copy">
            <h1>poe2act_checker</h1>
            <p className="launch-note">0.5.0 한국시간 5월 30일 오전 5시 오픈 · 잠컨 추천 3시 기상</p>
          </div>
          <div className="top-action-panel" aria-label="POE2 바로가기와 오픈 카운트다운">
            <div className="launch-countdown">
              <span>0.5.0 오픈까지</span>
              <strong>{formatLaunchRemaining(now)}</strong>
            </div>
            <div className="top-action-buttons">
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
          <div className="issue-list">
            {issueItems.filter((issue) => !issue.hidden).map((issue) => (
              <article className="issue-card" key={issue.id}>
                <div className="issue-card-header">
                  <div>
                    <span className="issue-category">{issue.category}</span>
                    <h3>{issue.title}</h3>
                  </div>
                  <div className="issue-header-actions">
                    <span className="issue-status">{issue.status}</span>
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

                  <blockquote>{issue.quote}</blockquote>
                  {renderIssueSummary(issue)}

                  {issue.tags && issue.tags.length > 0 && (
                    <div className="issue-tags" aria-label="태그">
                      {issue.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="issue-source-row">
                  <span>{issue.publishedAt ? `${issue.publishedAt} · ` : ''}{issue.sourceName}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default App
