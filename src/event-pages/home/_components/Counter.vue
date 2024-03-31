<template>
  <div v-if="remainingTime > 0">
    <span>이벤트 종료 </span>
    <span v-if="remainingDays > 1">D-{{ remainingDays }}</span>
    <span v-else>{{ formattedTime }}</span>
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps({
  target: {type: Date, default: new Date()},
  current: {type: Date, default: new Date()}
})

const remainingTime = computed(() => {
  return props.target.getTime() - props.current.getTime()
})

const remainingDays = computed(() => {
  return Math.ceil(remainingTime.value / (1000 * 60 * 60 * 24))
})

const formattedTime = computed(() => {
  const hours = String(Math.floor(remainingTime.value / (1000 * 60 * 60)) % 24).padStart(2, '0')
  const minutes = String(Math.floor(remainingTime.value / (1000 * 60)) % 60).padStart(2, '0')
  const seconds = String(Math.floor(remainingTime.value / 1000) % 60).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
})
</script>
