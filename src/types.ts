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
export type IssueTab = '전체' | '공식' | '커뮤니티' | '빌드' | '도구' | '이슈' | '잡똥글'

export type IssueItem = {
  id: string
  issueNumber: number
  category: string
  issueTab: IssueTab
  title: string
  quote: string
  summary: string
  summaryMarkdown?: string
  sourceName: string
  sourceUrl: string
  sourceType?: 'youtube' | 'article'
  videoEmbedUrl?: string
  status: IssueStatus
  publishedAt?: string
  myNote?: string
  tags?: string[]
  hidden?: boolean
}
