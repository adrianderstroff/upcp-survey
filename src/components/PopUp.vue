<script setup lang="ts">
import type { Survey } from '@/types/dataset'
import { defineProps, onMounted, ref } from 'vue'

// Define props
const props = defineProps<{
  text: string
  isVisible: boolean
}>()

const visible = ref(true)

const dismiss = () => {
  console.log('dismiss')
  visible.value = false
}

onMounted(() => {
  visible.value = props.isVisible
})
</script>

<template>
  <div class="popup" v-show="visible">
    <div class="content">
      <button @click="dismiss()">x</button>
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped>
.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.content {
  padding: 20px;
  background: white;
  border-radius: 15px;
  color: black;
  box-shadow: 0 10px 10px -5px black;
  max-width: 33%;
  position: relative;
}

.content button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  z-index: 4;
  color: red;
}
</style>
