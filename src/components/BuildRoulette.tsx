import { useMemo, useRef, useState } from 'react'
import { defaultRouletteBuilds, type RouletteBuild } from '../data/buildRoulette'

const STORAGE_BUILDS = 'poe2_build_roulette.builds.v2'
const STORAGE_LOG = 'poe2_build_roulette.result_log.v1'
const PALETTE = ['#ff4d6d', '#3a86ff', '#ffbe0b', '#06d6a0', '#8338ec', '#fb5607', '#00b4d8', '#ff70a6']

type RouletteLogItem = {
  spinNumber: number
  build: RouletteBuild
}

type RouletteRow = RouletteBuild & {
  rowId: string
}

type Sector = {
  start: number
  end: number
  mid: number
  size: number
}

function normalizeWeight(value: unknown) {
  const weight = Number(value)
  return Number.isFinite(weight) && weight > 0 ? weight : 10
}

function normalizeBuilds(input: unknown): RouletteBuild[] {
  if (!Array.isArray(input)) return []

  return input
    .map((item) => {
      if (typeof item === 'string') {
        return { title: item.trim(), weight: 10, youtubeUrl: '' }
      }

      if (!item || typeof item !== 'object') {
        return { title: '', weight: 10, youtubeUrl: '' }
      }

      const build = item as Partial<RouletteBuild> & { url?: string }
      return {
        title: String(build.title || '').trim(),
        weight: normalizeWeight(build.weight),
        youtubeUrl: String(build.youtubeUrl || build.url || '').trim(),
      }
    })
    .filter((item) => item.title.length > 0)
}

function loadBuilds() {
  const stored = window.localStorage.getItem(STORAGE_BUILDS)
  if (!stored) return defaultRouletteBuilds

  try {
    const parsed = normalizeBuilds(JSON.parse(stored))
    return parsed.length > 0 ? parsed : defaultRouletteBuilds
  } catch {
    return defaultRouletteBuilds
  }
}

function loadLog() {
  const stored = window.localStorage.getItem(STORAGE_LOG)
  if (!stored) return []

  try {
    const parsed = JSON.parse(stored) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is RouletteLogItem => Boolean(item && item.build && item.build.title))
  } catch {
    return []
  }
}

function createRows(builds: RouletteBuild[]) {
  return builds.map((build, index) => ({ ...build, rowId: `${Date.now()}-${index}-${build.title}` }))
}

function getSectors(builds: RouletteBuild[]): Sector[] {
  const totalWeight = builds.reduce((sum, build) => sum + normalizeWeight(build.weight), 0) || 1
  let cursor = 0

  return builds.map((build) => {
    const size = (normalizeWeight(build.weight) / totalWeight) * 360
    const start = cursor
    const end = cursor + size
    cursor = end
    return { start, end, mid: start + size / 2, size }
  })
}

function polarPoint(cx: number, cy: number, radius: number, angleDeg: number) {
  const radians = (angleDeg * Math.PI) / 180
  return {
    x: cx + radius * Math.sin(radians),
    y: cy - radius * Math.cos(radians),
  }
}

function describeSector(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarPoint(cx, cy, radius, endAngle)
  const end = polarPoint(cx, cy, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return ['M', cx, cy, 'L', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y, 'Z'].join(' ')
}

function labelPoint(angleDeg: number, radius: number) {
  return polarPoint(50, 50, radius, angleDeg)
}

function labelRadiusForSector(size: number) {
  if (size < 16) return 31
  if (size < 28) return 33
  return 35
}

function formatWheelLabel(title: string, sectorSize: number) {
  if (sectorSize < 7) return ''
  const compact = title.replace(/\s+/g, ' ')
  const maxLength = sectorSize < 18 ? 5 : sectorSize < 30 ? 8 : 12
  return compact.length > maxLength ? `${compact.slice(0, maxLength)}…` : compact
}

function pickWeightedIndex(builds: RouletteBuild[]) {
  const totalWeight = builds.reduce((sum, build) => sum + normalizeWeight(build.weight), 0)
  let cursor = Math.random() * totalWeight

  for (let index = 0; index < builds.length; index += 1) {
    cursor -= normalizeWeight(builds[index].weight)
    if (cursor <= 0) return index
  }

  return Math.max(builds.length - 1, 0)
}

function updateLog(nextLog: RouletteLogItem[]) {
  window.localStorage.setItem(STORAGE_LOG, JSON.stringify(nextLog))
}

export function BuildRoulette() {
  const [builds, setBuilds] = useState<RouletteBuild[]>(() => loadBuilds())
  const [rows, setRows] = useState<RouletteRow[]>(() => createRows(loadBuilds()))
  const [resultLog, setResultLog] = useState<RouletteLogItem[]>(() => loadLog())
  const [statusText, setStatusText] = useState('룰렛을 돌려 빌드를 뽑으세요.')
  const [rotation, setRotation] = useState(0)
  const [transitionMs, setTransitionMs] = useState(4300)
  const [isSpinning, setIsSpinning] = useState(false)
  const stopTimerRef = useRef<number | null>(null)
  const wheelRef = useRef<HTMLDivElement | null>(null)
  const pendingResultRef = useRef<RouletteBuild | null>(null)
  const targetRotationRef = useRef(0)
  const finishedSpinRef = useRef(false)

  const sectors = useMemo(() => getSectors(builds), [builds])

  function clearStopTimer() {
    if (stopTimerRef.current) {
      window.clearTimeout(stopTimerRef.current)
      stopTimerRef.current = null
    }
  }

  function finishSpin(result: RouletteBuild) {
    if (finishedSpinRef.current) return
    finishedSpinRef.current = true
    clearStopTimer()
    pendingResultRef.current = null
    setResultLog((previousLog) => {
      const nextSpinNumber = previousLog.reduce((max, item) => Math.max(max, item.spinNumber || 0), 0) + 1
      const nextLog = [{ spinNumber: nextSpinNumber, build: result }, ...previousLog].slice(0, 20)
      updateLog(nextLog)
      setStatusText(`${nextSpinNumber}회 결과: ${result.title}`)
      return nextLog
    })
    setIsSpinning(false)
  }

  function normalizeDegrees(value: number) {
    return ((value % 360) + 360) % 360
  }

  function getCurrentWheelRotation() {
    const transform = wheelRef.current ? window.getComputedStyle(wheelRef.current).transform : 'none'
    if (!transform || transform === 'none') return normalizeDegrees(rotation)

    const matrix = new DOMMatrixReadOnly(transform)
    return normalizeDegrees((Math.atan2(matrix.b, matrix.a) * 180) / Math.PI)
  }

  function finishWhenWheelStops() {
    const result = pendingResultRef.current
    if (result) finishSpin(result)
  }

  function fastStopTowardPendingResult() {
    const result = pendingResultRef.current
    if (!result) return

    const currentRotation = getCurrentWheelRotation()
    const targetMod = normalizeDegrees(targetRotationRef.current)
    let delta = normalizeDegrees(targetMod - currentRotation)
    if (delta < 35) delta += 360
    const fastTargetRotation = currentRotation + delta

    clearStopTimer()
    setTransitionMs(0)
    setRotation(currentRotation)
    targetRotationRef.current = fastTargetRotation
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setStatusText('멈추는 중...')
        setTransitionMs(650)
        setRotation(fastTargetRotation)
        stopTimerRef.current = window.setTimeout(() => finishSpin(result), 760)
      })
    })
  }

  function spin() {
    if (isSpinning) {
      fastStopTowardPendingResult()
      return
    }

    if (builds.length === 0) {
      setStatusText('빌드 목록이 비어 있습니다. 최소 1개 이상 저장하세요.')
      return
    }

    const selectedIndex = pickWeightedIndex(builds)
    const selectedSector = sectors[selectedIndex]
    const selectedBuild = builds[selectedIndex]
    const fullSpins = 6 + Math.floor(Math.random() * 4)
    const jitter = (Math.random() - 0.5) * Math.max(selectedSector.size * 0.55, 1)
    const targetMod = normalizeDegrees(360 - selectedSector.mid - jitter)
    let nextRotation = rotation + fullSpins * 360
    nextRotation += normalizeDegrees(targetMod - normalizeDegrees(nextRotation))

    clearStopTimer()
    finishedSpinRef.current = false
    pendingResultRef.current = selectedBuild
    targetRotationRef.current = nextRotation
    setIsSpinning(true)
    setStatusText('룰렛 회전 중... 다시 누르면 바로 멈춥니다.')
    setTransitionMs(4300)
    setRotation(nextRotation)
    stopTimerRef.current = window.setTimeout(() => finishSpin(selectedBuild), 4450)
  }

  function saveBuilds() {
    const parsed = normalizeBuilds(rows)
    if (parsed.length === 0) {
      setStatusText('빌드 목록이 비어 있습니다. 최소 1개 이상 입력하세요.')
      return
    }

    setBuilds(parsed)
    setRows(createRows(parsed))
    window.localStorage.setItem(STORAGE_BUILDS, JSON.stringify(parsed))
    setRotation(0)
    setStatusText(`${parsed.length}개 빌드 목록을 저장했습니다.`)
  }

  function resetBuilds() {
    setBuilds(defaultRouletteBuilds)
    setRows(createRows(defaultRouletteBuilds))
    window.localStorage.removeItem(STORAGE_BUILDS)
    setRotation(0)
    setStatusText('기본 빌드 목록으로 복원했습니다.')
  }

  function clearLog() {
    setResultLog([])
    window.localStorage.removeItem(STORAGE_LOG)
    setStatusText('결과 로그를 비웠습니다.')
  }

  function updateRow(rowId: string, patch: Partial<RouletteBuild>) {
    setRows((previous) => previous.map((row) => (row.rowId === rowId ? { ...row, ...patch } : row)))
  }

  function deleteRow(rowId: string) {
    setRows((previous) => {
      const next = previous.filter((row) => row.rowId !== rowId)
      return next.length > 0 ? next : createRows([{ title: '', weight: 10, youtubeUrl: '' }])
    })
  }

  function addRowAtTop() {
    setRows((previous) => [{ title: '', weight: 10, youtubeUrl: '', rowId: `new-${Date.now()}` }, ...previous])
  }

  return (
    <section className="roulette-page" aria-label="POE2 빌드 룰렛">
      <div className="roulette-board">
        <div className="roulette-stage" aria-label="가중치가 적용된 빌드 룰렛">
          <div className="roulette-pointer" aria-hidden="true" />
          <div
            className="roulette-wheel"
            onTransitionEnd={(event) => {
              if (event.propertyName === 'transform') finishWhenWheelStops()
            }}
            ref={wheelRef}
            style={{ transform: `rotate(${rotation}deg)`, transitionDuration: `${transitionMs}ms` }}
          >
            <svg aria-label="가중치가 적용된 빌드 룰렛" className="roulette-svg" role="img" viewBox="0 0 100 100">
              {sectors.map((sector, index) => (
                <path
                  className="roulette-slice"
                  d={describeSector(50, 50, 48, sector.start, sector.end)}
                  fill={PALETTE[index % PALETTE.length]}
                  key={`${builds[index].title}-${sector.start}`}
                />
              ))}
              {sectors.map((sector, index) => {
                const label = formatWheelLabel(builds[index].title, sector.size)
                if (!label) return null
                const point = labelPoint(sector.mid, labelRadiusForSector(sector.size))
                return (
                  <text
                    aria-label={`${builds[index].title} / 가중치 ${builds[index].weight}`}
                    className={`roulette-label${sector.size < 18 ? ' tiny' : sector.size < 30 ? ' narrow' : ''}`}
                    dominantBaseline="middle"
                    key={`${builds[index].title}-label`}
                    textAnchor="middle"
                    x={point.x}
                    y={point.y}
                  >
                    {label}
                  </text>
                )
              })}
            </svg>
          </div>
        </div>

        <div className="roulette-control-card">
          <p className="roulette-kicker">Build Randomizer</p>
          <h2>POE2 빌드 룰렛</h2>
          <p>{statusText}</p>
          <button className="roulette-spin-button" onClick={spin} type="button">
            {isSpinning ? '바로 멈추기' : '룰렛 돌리기'}
          </button>
        </div>

        <div className="roulette-log-card">
          <div className="roulette-log-header">
            <strong>결과 로그</strong>
            <button disabled={resultLog.length === 0} onClick={clearLog} type="button">
              로그 비우기
            </button>
          </div>
          {resultLog.length === 0 ? (
            <p className="roulette-empty-log">아직 결과가 없습니다.</p>
          ) : (
            <ol>
              {resultLog.map((item) => (
                <li key={`${item.spinNumber}-${item.build.title}`}>
                  <span>{item.spinNumber}회 - {item.build.title}</span>
                  {item.build.youtubeUrl && (
                    <a href={item.build.youtubeUrl} rel="noreferrer" target="_blank">
                      영상
                    </a>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div className="roulette-editor-card">
        <div className="roulette-editor-header">
          <div>
            <p className="roulette-kicker">Local list</p>
            <h2>빌드 목록</h2>
          </div>
          <div className="roulette-editor-actions">
            <button onClick={addRowAtTop} type="button">행 추가</button>
            <button onClick={saveBuilds} type="button">저장</button>
            <button onClick={resetBuilds} type="button">기본 복원</button>
          </div>
        </div>

        <div className="roulette-table-wrap">
          <table className="roulette-build-table">
            <thead>
              <tr>
                <th>빌드 제목</th>
                <th>가중치</th>
                <th>유튜브 URL</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.rowId}>
                  <td>
                    <input
                      onChange={(event) => updateRow(row.rowId, { title: event.target.value })}
                      placeholder="예: 돌개바람"
                      type="text"
                      value={row.title}
                    />
                  </td>
                  <td>
                    <input
                      min="10"
                      onChange={(event) => updateRow(row.rowId, { weight: normalizeWeight(event.target.value) })}
                      step="10"
                      type="number"
                      value={row.weight}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(event) => updateRow(row.rowId, { youtubeUrl: event.target.value })}
                      placeholder="https://..."
                      type="url"
                      value={row.youtubeUrl}
                    />
                  </td>
                  <td>
                    <button onClick={() => deleteRow(row.rowId)} type="button">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
