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
