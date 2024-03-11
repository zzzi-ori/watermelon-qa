<template>
  <div class="relative flex items-center justify-center px-6 py-2">
    <div class="absolute left-6 min-w-8">
      <slot name="left"/>
    </div>
    <slot>
      <div/>
    </slot>
    <div class="absolute right-6 min-w-8">
      <slot name="right"/>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
