export type Dataset = {
  name: string
  columns: number
  rows: number
  data: number[][]
}

export type DatasetType = 'trend' | 'survey' | 'outlier' | 'tracing'


export interface Task {
  name: string
  dataset: Dataset
  type: DatasetType
}

export interface TrendTask extends Task {
  axisIndices: [number, number]
  userValues?: [number, number]
}

export interface OutlierTask extends Task {
  axisIndex: number
  userValue?: number
}

export interface LineTracingTask extends Task {
  axisIndex: number
  rowIndex: number
  userValue?: number
}

export interface DistributionTask extends Task {
  axisIndex: number
  rowIndex: number
  userValues?: number[]
}

export type SurveyStep = Task | 'intro' | 'submit' | 'attentioncheck'

export type Survey = {
  name: string
  taskType: string
  steps: SurveyStep[]
  stepIndex: number
}
