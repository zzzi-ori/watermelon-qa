<template>
    <router-view />
</template>
<script setup lang="ts">
import {RouterView} from 'vue-router'
import {onMounted} from 'vue'

onMounted(()=>{
  window.scrollTo(0, 1)
})
</script>
