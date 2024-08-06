<script setup lang="ts">
import { ref } from 'vue'
import WelcomePage from '@/components/HelloWorld.vue'
import TrendEstimation from '@/components/TrendEstimation.vue'
import AttentionCheck from '@/components/AttentionCheck.vue'
import SubmitResults from '@/components/SubmitResults.vue'
import LineTracing from './components/LineTracing.vue'
import OutlierDetection from './components/OutlierDetection.vue'

import type {
  Dataset,
  LineTracingTask,
  OutlierTask,
  Survey,
  SurveyStep,
  Task,
  TrendTask
} from './types/dataset'

const dataSet1: Dataset = {
  name: 'TestDataset1',
  columns: 5,
  rows: 5,
  data: [
    [[1], [2], [1], [4], [1.2]],
    [[3], [2.2], [1.1], [3], [5]],
    [[5], [1.9, 1.95, 2, 2.12, 2.2, 2.0], [2], [6], [3]],
    [[1], [4], [5], [2.4], [2.5]],
    [[2], [1.9], [2], [1], [2]]
  ]
}

const dataSet2: Dataset = {
  name: 'TestDataset2',
  columns: 5,
  rows: 5,
  data: [
    [[1], [2], [3], [4], [5]],
    [[1], [2], [3], [4], [5]],
    [[1], [2], [3], [4], [5]],
    [[1], [2], [3], [4], [5]],
    [[1], [2], [3], [4], [5]]
  ]
}

const survey = {
  name: 'TestSurvey',
  taskType: 'tracing',
  steps: [
    'intro',
    'attentioncheck',
    {
      type: 'outlier',
      dataset: dataSet1,
      axisIndices: [1, 2]
    } as OutlierTask,
    {
      type: 'tracing',
      dataset: dataSet2,
      axisIndex: 3
    } as LineTracingTask,
    {
      type: 'trend',
      dataset: dataSet1,
      axisIndices: [1, 2]
    } as TrendTask,
    'attentioncheck',
    'submit'
  ] as SurveyStep[],
  stepIndex: 0
} as Survey

const getView = () => {
  const step = survey.steps[survey.stepIndex]

  if (step === 'intro') {
    return WelcomePage
  } else if (step === 'attentioncheck') {
    return AttentionCheck
  } else if (survey.stepIndex == survey.steps.length) {
    return SubmitResults
  } else if (survey.stepIndex > survey.steps.length) {
    window.location.href = 'https://app.prolific.com/submissions/complete?cc=C1BRSWJ9'
  } else {
    switch ((survey.steps[survey.stepIndex] as Task).type) {
      case 'trend':
        return TrendEstimation
      case 'tracing':
        return LineTracing
      case 'outlier':
        return OutlierDetection
    }
  }

  return WelcomePage
}

const currentComponent = ref(WelcomePage)

function switchComponent() {
  survey.stepIndex++
  currentComponent.value = getView()
}

const nextPageCallback = () => {
  switchComponent()
}
const declineCallback = () => {
  window.location.href = 'https://app.prolific.com/submissions/complete?cc=C1NJBTR8'
}
</script>

<template>
  <div class="content">
    <component
      :is="currentComponent"
      userID="Test"
      :survey="survey"
      :nextPageCallback="nextPageCallback"
      :declineCallback="declineCallback"
    >
    </component>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
