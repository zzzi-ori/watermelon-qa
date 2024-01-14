<template>
  <div class="ground absolute bottom-0 w-full bg-[#81685A]">
    <img :src="groundPattern" alt="ground" />
  </div>
</template>
<script setup lang="ts">
import groundPattern from '../../../assets/ground-pattern.svg'
import {computed} from "vue";

const props = defineProps({
  height: Number
})

const heightRef = computed(() => {
  alert(`${props.height}px`)
  return `${props.height}px`
})

</script>
<style scoped>
.ground {
  height: v-bind(heightRef);
}
</style>
