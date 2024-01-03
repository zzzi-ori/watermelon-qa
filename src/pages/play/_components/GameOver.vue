<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="flex flex-col gap-10 w-[300px] h-[675px] justify-center items-center bg-white text-4xl rounded-3xl border-2 border-black">
      <img :src="endText" alt="끗" width="75"/>
      <img :src="endImage" alt="덕 같이 멸망" width="253"/>
      <span>score: {{ score }}</span>
      <button @click="$emit('replay')" class="bg-[#FCBF31] rounded-full border-2 border-black px-6">또 해야되네</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import endImage from '../../../assets/end-image.png'
import endText from '../../../assets/end-text.png'

defineProps({
  score: {
    type: Number,
    default: 0
  }
})
</script>
