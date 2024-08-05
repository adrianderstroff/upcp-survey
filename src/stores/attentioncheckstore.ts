// stores/counter.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAttentionCheckStore = defineStore('failedChecks', () => {
  const failedChecks = ref(0)
  function incrementFailedChecks() {
    failedChecks.value++
  }

  return { failedChecks, incrementFailedChecks }
})
