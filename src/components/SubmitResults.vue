<script setup lang="ts">
import type { Survey } from '@/types/dataset'

// Define props
const props = defineProps<{
  userID: string
  survey: Survey
  nextPageCallback: () => void
  declineCallback: () => void
}>()
</script>

<template>
  <div class="greetings">
    <div class="header">
      <h1 class="green">Submit Results</h1>
    </div>
    <h3>
      Thank you for participating in our study. Please click the button below to submit your
      results. If you have any questions or concerns, please contact us at
      <a href="mailto: aderstro@uni-muenster.de">aderstro@uni-muenster.de</a>.
    </h3>
  </div>
  <button @click="nextPageCallback()">Submit</button>
</template>

<style scoped>
content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.header {
  font-size: 2em;
  text-align: center;
  margin-bottom: 2em;
}

.greetings {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h3 {
  font-size: 1.2em;
  text-align: justify;
}

h3 .accept {
  background-color: hsla(160, 100%, 37%, 1);
  padding: 0.2em 0.5em;
  border-radius: 4px;
  color: white;
}

button {
  margin-top: 2em;
  padding: 1em 2em;
  font-size: 1.5em;
  background-color: hsla(160, 100%, 37%, 1);
  box-shadow: 0 2px 4px black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:active {
  background-color: hsla(160, 100%, 27%, 1);
  transform: translate(0, 2px);
  box-shadow: 0 0px 0px black;
}
</style>
