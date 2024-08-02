<script setup lang="ts">
// Define props
const props = defineProps<{
  userID: string,
  nextPageCallback: () => void
  declineCallback: () => void
}>()
</script>

<template>
  <div class="greetings">
    <h3>
      Thank you for participating user
      <span class="green">{{ props.userID ?? 'Unknown' }}</span> !
    </h3>
    <h3>
      You may decline in case you don't want to participate in this survey. Other proceed with the study.
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

.greetings {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h3 {
  font-size: 1.2em;
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
</style>
