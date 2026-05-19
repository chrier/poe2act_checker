import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { actGuides } from './data/acts'
import { issueItems } from './data/issues'

const STORAGE_KEY = 'poe2act_checker.completed_steps'
const UPDATE_TIP_PREFIX = '[0.5 동선 개선]'
const WEAPON_TIP_PREFIX = '[무기 제작]'

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

function App() {
  const [activeAct, setActiveAct] = useState(actGuides[0].act)
  const [activeView, setActiveView] = useState<'checklist' | 'issues'>('checklist')
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => readCompletedSteps())

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
          <h1>poe2act_checker</h1>
          <div className="header-meta">
            <p className="eyebrow">Path of Exile 2 Act Route</p>
            <p className="description">
              액트 진행 순서대로 주요 보상과 짧은 팁만 확인하는 체크리스트입니다.
            </p>
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
        <button
          className={activeView === 'issues' ? 'issue-tab active' : 'issue-tab'}
          onClick={() => setActiveView('issues')}
          type="button"
        >
          POE2 이슈
        </button>
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
                  <span className="issue-status">{issue.status}</span>
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
                  <p className="issue-summary">{issue.summary}</p>

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
                  <a href={issue.sourceUrl} rel="noreferrer" target="_blank">
                    원문 보기
                  </a>
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
