<script setup lang="ts">
import { useResultsStore } from '@/stores/resultstore'
import type { LineTracingTask, Survey, Task } from '@/types/dataset'
import PopUp from './PopUp.vue'
import * as d3 from 'd3'
import { onMounted } from 'vue'
import { ref } from 'vue'

const videoFileName = ref('')

// Define props
const props = defineProps<{
  userID: string
  survey: Survey
  nextPageCallback: () => void
  declineCallback: () => void
}>()

const margin = { top: 29, right: 80, bottom: 18, left: 80 }

const collectUserData = () => {
  const container = d3.select('#tracing-widget')
  //@ts-ignore
  const bounds = container.node()?.getBoundingClientRect() ?? { width: 0, height: 0 }
  const { height } = bounds

  const values = d3
    .select('#tracing-widget')
    .selectAll('.circle')
    .nodes()
    .map((node: any) => {
      const y = +d3.select(node).attr('cy')
      return (y - margin.top) / (height - margin.top - margin.bottom)
    })

  console.log('Values:', values)
  const resultsStore = useResultsStore()
  const name = (props.survey.steps[props.survey.stepIndex] as Task).name
  resultsStore.addUserResult(name, values)
  props.nextPageCallback()
}

onMounted(() => {
  // set video url
  videoFileName.value = props.survey.steps[props.survey.stepIndex].videoURL

  const container = d3.select('#tracing-widget')
  //@ts-ignore
  const bounds = container.node()?.getBoundingClientRect() ?? { width: 0, height: 0 }
  const { width, height } = bounds
  const svg = container
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // Define line positions
  const currentTask = props.survey.steps[props.survey.stepIndex] as Task
  const numColumns = currentTask.dataset.columns
  const columnIndex = (currentTask as LineTracingTask).axisIndex
  const step = (width - margin.left - margin.right) / (numColumns - 1)
  const x1 = columnIndex * step
  const lineData = [{ x: x1, y1: margin.top, y2: height - margin.bottom - margin.top }]

  // Draw vertical lines
  svg
    .selectAll('.line')
    .data(lineData)
    .enter()
    .append('line')
    .attr('x1', (d) => d.x)
    .attr('y1', (d) => d.y1)
    .attr('x2', (d) => d.x)
    .attr('y2', (d) => d.y2)
    .attr('stroke', 'rgba(255, 0, 0, 0.7)')
    .attr('stroke-width', 2)

  // Initial circle positions
  const circleData = [{ cx: lineData[0].x, cy: height / 2 }]

  // Function to constrain movement to vertical line
  function dragCircle(evt: any) {
    //@ts-ignore
    const d = this
    const y1 = lineData[0].y1
    const y2 = lineData[0].y2
    const mouse_y = d3.pointer(evt, svg.node())[1]
    const relative_y = Math.max(y1, Math.min(y2, mouse_y))
    d3.select(d).attr('cy', relative_y)
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
    .attr('fill', 'red')
    .attr('cursor', 'grab')
    .attr('z-index', -2)
    .call(d3.drag<any, any>().on('drag', dragCircle))
})
</script>

<template>
  <PopUp
    text="Trace the highlighted line to the axis in red. Move the slider to the point where the axis intersects this axis. Once you are done press the Next button."
    isVisible="true"
  ></PopUp>
  <h1>Line Tracing</h1>
  <div class="greetings">
    <video width="1280" height="720" loop autoplay>
      <source :src="videoFileName" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div id="tracing-widget"></div>
  </div>
  <button @click="collectUserData()">Next</button>
</template>

<style scoped>
h1 {
  margin-bottom: 1em;
}

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
  position: relative;
}

h3 {
  font-size: 1.2em;
}

button {
  margin-top: 1em;
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

#tracing-widget {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
