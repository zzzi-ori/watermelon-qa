<template>
  <div class="flex items-center gap-1">
    <div class="text-title">{{ score }}</div>
    <img :src="coin" alt="찌오 코인"/>
  </div>
</template>
<script setup lang="ts">
import coin from '../../../assets/coin.svg'

defineProps({
  score: {
    type: Number,
    default: 0
  }
})
</script>
