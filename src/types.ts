export type ActStep = {
  id: string
  title: string
  rewards: string[]
  next?: string
  tips?: string[]
}

export type ActGuide = {
  act: number
  title: string
  steps: ActStep[]
}

export type IssueStatus = '확인 필요' | '반영 예정' | '반영 완료' | '보류'

export type IssueItem = {
  id: string
  category: string
  title: string
  quote: string
  summary: string
  sourceName: string
  sourceUrl: string
  status: IssueStatus
  publishedAt?: string
  myNote?: string
  tags?: string[]
}
