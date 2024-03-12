<template>
  <div class="relative border-solid border-2 border-black rounded-lg bg-primary px-4 py-1">
    <span class="text-body-b">{{ text }}</span>
    <img :src="labelLine" class="absolute right-[2px] top-[2px]"/>
  </div>
</template>
<script setup lang="ts">
import labelLine from '../assets/label-line.svg'

defineProps({
  text: {
    type: String,
    default: ''
  },
})
</script>
