export type Dataset = {
  name: string
  columns: number
  rows: number
  data: number[][]
}

export type DatasetType = 'trend' | 'survey'

export type Task = {
  name: string
  dataset: Dataset
  type: DatasetType
}

export interface TrendTask extends Task {
  axisIndices: [number, number]
  userValues?: [number, number]
}

export type Survey = {
  name: string
  tasks: Task[]
  taskIndex: number
}
