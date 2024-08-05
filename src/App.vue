<script setup>
import { ref } from 'vue'
import ComponentA from '@/components/HelloWorld.vue'
import TrendComponent from '@/components/TrendEstimation.vue'
import AttentionCheck from '@/components/AttentionCheck.vue'
import SubmitResults from '@/components/SubmitResults.vue'

const survey = {
  tasks: [
    {
      type: 'trend',
      dataset: {
        columns: 5,
        data: [
          [1, 2, 3, 4, 5],
          [2, 3, 4, 5, 6],
          [3, 4, 5, 6, 7],
          [4, 5, 6, 7, 8],
          [5, 6, 7, 8, 9]
        ]
      },
      axisIndices: [0, 1]
    },
    {
      type: 'trend',
      dataset: {
        columns: 4,
        data: [
          [1, 2, 3, 4, 5],
          [2, 3, 4, 5, 6],
          [3, 4, 5, 6, 7],
          [4, 5, 6, 7, 8],
          [5, 6, 7, 8, 9]
        ]
      },
      axisIndices: [1, 2]
    }
  ],
  taskIndex: -1
}

const currentComponent = ref(ComponentA)
function switchComponent() {
  survey.taskIndex++

  if (survey.taskIndex == 0) {
    currentComponent.value = AttentionCheck
  } else if (survey.taskIndex == survey.tasks.length) {
    currentComponent.value = SubmitResults
  } else if (survey.taskIndex > survey.tasks.length) {
    window.location.href = 'https://app.prolific.com/submissions/complete?cc=C1BRSWJ9'
  } else {
    currentComponent.value = TrendComponent
  }
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
