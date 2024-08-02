<script setup>
import { ref } from 'vue';
import ComponentA from '@/components/HelloWorld.vue';
import ComponentB from '@/components/TrendEstimation.vue';
const currentComponent = ref(ComponentA);
function switchComponent() {
    currentComponent.value = ComponentB;
}

const nextPageCallback = () => {
  switchComponent();
}
const declineCallback = () => {
  window.location.href = 'https://app.prolific.com/submissions/complete?cc=C1NJBTR8';
}
</script>

<template>
  <header>
    <h1 class="green">uPCP Survey</h1>
  </header>
  <content>
    <keep-alive>
      <component 
        :is=currentComponent
        userID="Test" 
        :nextPageCallback=nextPageCallback 
        :declineCallback="declineCallback">
      </component>
    </keep-alive>
  </content>
</template>

<style scoped>
header {
  font-size: 2em;
  text-align: center;
  margin-bottom: 2em;
}

content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>