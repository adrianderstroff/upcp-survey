<script setup lang="ts">
// Define props
const props = defineProps<{
  userID: string
}>()
</script>

<template>
  <header>
    <div class="greetings">
      <h1 class="green">uPCP Survey</h1>
      <h3>
        Thank you for participating user
        <span class="green">{{ props.userID }}</span> !
      </h3>
    </div>
    <button @click="$router.push('/survey')">Start Survey</button>
  </header>
</template>

<style scoped>
header {
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

h1 {
  font-size: 4em;
}

h3 {
  font-size: 1.5em;
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
