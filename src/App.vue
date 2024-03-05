<template>
  <layout>
    <router-view/>
  </layout>
</template>
<script setup lang="ts">
import {RouterView} from 'vue-router'
import {onMounted} from 'vue'
import Layout from './components/Layout.vue'

onMounted(() => {
  window.scrollTo(0, 1)
})
</script>
