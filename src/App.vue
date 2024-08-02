<script setup lang="ts">
import HomeView from './views/HomeView.vue'
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
console.log(urlParams.get('userID'))
const userID = urlParams.get('userID')
</script>

<template>
  <main>
    <HomeView userID />
  </main>
</template>

<style scoped>
main {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
