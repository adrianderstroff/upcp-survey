// stores/counter.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Result = {
  name: string
  values: number[]
}

export const useResultsStore = defineStore('results', () => {
  const results = ref([] as Result[])
  function addUserResult(name: string, values: number[]) {
    results.value.push({ name, values })
  }

  return { results, addUserResult }
})
