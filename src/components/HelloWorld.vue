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
      <h1 class="green">uPCP Survey</h1>
    </div>
    <h3>
      Thank you for considering participation in our study. Before proceeding, please read the
      following information carefully to understand how your data will be collected, used, stored,
      and protected. We will collect data including mouse movement as well as interaction with the
      provided visualizations. This data will be used solely for research purposes related to
      evaluate our application and to contribute to the field of uncertainty visualization. Your
      data will be stored securely on encrypted servers and will only be accessible to the research
      team. We will retain your data for the duration study, after which it will be permanently
      deleted. Your responses will be anonymized, ensuring that your identity is not linked to your
      data. Accumulated data may be shared with other researchers or published online for academic
      purposes, without any personally identifiable information. You have the right to withdraw your
      consent and request the deletion of your data at any time without penalty. If you wish to
      withdraw, please contact us at
      <a href="mailto: aderstro@uni-muenster.de"> aderstro@uni-muenster.de</a>. Your data will be
      held under the legal framework of GDPR, ensuring that your rights and privacy are protected.
      By clicking <span class="accept">Start Survey</span>, you acknowledge that you have read and
      understood the above information and consent to participate in this study under these terms.
      Otherwise press <span class="decline">Decline</span> and we won't collect any of your data.
    </h3>
  </div>
  <button @click="nextPageCallback()">Start Survey</button>
  <button class="decline" @click="declineCallback()">Decline</button>
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

h3 .decline {
  color: red;
  padding: 0.2em 0.5em;
  border-radius: 4px;
  border: 1px solid red;
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

.decline {
  background-color: transparent;
  color: red;
  border: 2px solid red;
  box-shadow: none;
  padding: 10px;
}
.decline:active {
  background-color: transparent;
  transform: none;
}

.inline {
  padding: 2px;
}
</style>
