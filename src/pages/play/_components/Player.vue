<template>
  <div class="flex flex-col items-end w-[90px]">
    <span class="text-caption-b text-dark-green">
      Player
    </span>
    <span class="text-caption-b">
      {{ name }}
    </span>
  </div>
</template>
<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: ''
  }
})
</script>
