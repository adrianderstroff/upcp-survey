export type Dataset = {
  name: string
  columns: number
  rows: number
  data: number[][][]
}

export type DatasetType = 'trend' | 'survey' | 'outlier' | 'tracing'

////////////////////////////////////////////////////////////////////////////////
// Task

export interface Task {
  name: string
  dataset: Dataset
  type: DatasetType
  rowIndex: number
}

export interface TrendTask extends Task {
  axisIndices: [number, number]
  userValues?: [number, number]
}

export interface OutlierTask extends Task {
  axisIndices: [number, number]
  userValue?: number
}

export interface LineTracingTask extends Task {
  axisIndex: number
  userValue?: number
}

export interface DistributionTask extends Task {
  axisIndex: number
  userValues?: number[]
}

////////////////////////////////////////////////////////////////////////////////
// Survey

export type SurveyStep = Task | 'intro' | 'submit' | 'attentioncheck'

export type Survey = {
  name: string
  taskType: string
  steps: SurveyStep[]
  stepIndex: number
}
