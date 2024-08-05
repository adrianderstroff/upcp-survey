<script setup lang="ts">
import { useAttentionCheckStore } from '@/stores/attentioncheckstore'
import type { Survey } from '@/types/dataset'
import { shuffle } from '@/util/array'

// Define props
const props = defineProps<{
  userID: string
  survey: Survey
  nextPageCallback: () => void
  declineCallback: () => void
}>()

const colors = shuffle(['red', 'green', 'blue', 'yellow'])
const class0 = colors[0]
const class1 = colors[1]
const class2 = colors[2]
const class3 = colors[3]
const targetColor = colors[Math.floor(Math.random() * 4)]

const store = useAttentionCheckStore()
const checkUserInput = (selectedColor: string) => {
  console.log('selectedColor:', selectedColor)
  if (selectedColor !== targetColor) {
    store.incrementFailedChecks()
  }
  props.nextPageCallback()
}
</script>

<template>
  <div class="content">
    <h2>
      Select the <span>{{ targetColor }}</span> square among the following squares below to proceed.
    </h2>
    <div class="button-row">
      <button :class="class0" @click="checkUserInput(class0)"></button>
      <button :class="class1" @click="checkUserInput(class1)"></button>
      <button :class="class2" @click="checkUserInput(class2)"></button>
      <button :class="class3" @click="checkUserInput(class3)"></button>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  height: calc(100vh - 4rem);
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-bottom: 2em;
}

h2 span {
  text-decoration: underline;
}

.button-row {
  display: flex;
  justify-content: center;
}
button {
  display: inline-block;
  margin: 10px;
  padding: 30px;
  font-size: 16px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
}
.red {
  background-color: red;
}
.green {
  background-color: green;
}
.blue {
  background-color: blue;
}
.yellow {
  background-color: yellow;
}
</style>
