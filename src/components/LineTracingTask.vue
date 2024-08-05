<script setup lang="ts">
import { useResultsStore } from '@/stores/resultstore'
import type { LineTracingTask, Survey, TrendTask } from '@/types/dataset'
import * as d3 from 'd3'
import { onMounted } from 'vue'

// Define props
const props = defineProps<{
  userID: string
  survey: Survey
  nextPageCallback: () => void
  declineCallback: () => void
}>()

const collectUserData = () => {
  const coords = d3
    .select('#tracing-widget')
    .selectAll('.circle')
    .nodes()
    .map((node: any) => {
      return {
        x: +d3.select(node).attr('cx'),
        y: +d3.select(node).attr('cy')
      }
    })
    .reduce((acc: number[], val: { x: number; y: number }) => {
      acc.push(val.x)
      acc.push(val.y)
      return acc
    }, [])

  const resultsStore = useResultsStore()
  const name = `TrendEstimation ${props.survey.taskIndex}`
  resultsStore.addUserResult(name, coords)
  props.nextPageCallback()
}

onMounted(() => {
  const container = d3.select('#tracing-widget')
  //@ts-ignore
  const bounds = container.node()?.getBoundingClientRect() ?? { width: 0, height: 0 }
  const { width, height } = bounds
  const margin = { top: 3, right: 8, bottom: 3, left: 8 }
  const svg = container
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // Define line positions
  const currentTask = props.survey.tasks[props.survey.taskIndex]
  const numColumns = currentTask.dataset.columns
  const columnIndex = (currentTask as LineTracingTask).axisIndex
  const step = width / (numColumns - 1)
  const x1 = columnIndex * step
  const lineData = [
    { x: x1, y1: margin.top, y2: height - margin.bottom - margin.top }
  ]

  // Draw vertical lines
  svg
    .selectAll('.line')
    .data(lineData)
    .enter()
    .append('line')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y1)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)

  // Initial circle positions
  const circleData = [
    { cx: lineData[0].x, cy: height / 2 },
    { cx: lineData[1].x, cy: height / 2 }
  ]

  // Function to constrain movement to vertical line
  function dragCircle(evt: any) {
    //@ts-ignore
    const d = this
    const y1 = lineData[0].y1
    const y2 = lineData[0].y2
    const mouse_y = d3.pointer(evt, svg.node())[1]
    const relative_y = Math.max(y1, Math.min(y2, mouse_y))
    d3.select(d).attr('cy', relative_y)

    // Update connecting line
    const coords = svg
      .selectAll('.circle')
      .nodes()
      .map((node) => {
        return {
          x: +d3.select(node).attr('cx'),
          y: +d3.select(node).attr('cy')
        }
      })
  }

  // Draw circles
  svg
    .selectAll('.circle')
    .data(circleData)
    .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr('cx', (d) => d.cx)
    .attr('cy', (d) => d.cy)
    .attr('r', 8)
    .attr('fill', 'steelblue')
    .attr('z-index', -2)
    .call(d3.drag<any, any>().on('drag', dragCircle))
})
</script>

<template>
  <div class="greetings">
    <video width="640" height="360" controls>
      <source
        src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
    <div id="tracing-widget"></div>
  </div>
  <button @click="collectUserData()">Next</button>
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

#trend-widget {
  width: 640px;
  height: 360px;
}
</style>
