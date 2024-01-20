<template>
  <div class="text-[30px] font-black text-[#FEBE31] text-shadow">{{score}}</div>
</template>
<script setup lang="ts">
defineProps({
  score: {
    type:Number,
    default: 0
  }
})
</script>
<style scoped>
.text-shadow {
  text-shadow: 2px 0 #1E1E1E, -2px 0 #1E1E1E, 0 2px #1E1E1E, 0 -2px #1E1E1E, 1px 1px #1E1E1E, -1px -1px #1E1E1E, 1px -1px #1E1E1E, -1px 1px #1E1E1E;
}
</style>
