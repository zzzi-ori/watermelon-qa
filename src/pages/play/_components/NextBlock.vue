<template>
  <div class="flex justify-center items-center bg-[#FCBF31] rounded-[10px] w-28 border-2 border-black">
      <span class="text-[18px] mr-3 font-bold" >NEXT</span>
      <div :style="{background: block?.color}" class="w-[26px] h-[26px] rounded-full border-2 border-black"></div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import {blocks} from "../setting.ts";

const props = defineProps({
  nextIndex: {
    type: Number,
    default: 0
  }
})

const block = computed(() => blocks[props.nextIndex])
</script>
