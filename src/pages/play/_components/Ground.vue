<template>
  <div class="ground w-full bg-[#81685A]">
    <img :src="groundPattern" alt="ground" />
  </div>
</template>
<script setup lang="ts">
import groundPattern from '../../../assets/ground-pattern.svg'
import {computed} from "vue";

const props = defineProps({
  height: Number
})

const heightRef = computed(() => `${props.height}px`)

</script>
<style scoped>
.ground {
  height: v-bind(heightRef);
}
</style>
