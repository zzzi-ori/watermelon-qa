<template>
  <div class="flex justify-center items-center bg-[#FCBF31] rounded-[10px] w-28 py-1 border-2 border-black">
      <span class="text-[18px] mr-3 font-bold" >NEXT</span>
      <img :src="block" class="w-[26px] h-[26px]" />
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import {n1, n2, n3, n4, n5, n6, n7, n8, n9, n10} from '/src/assets/next'

const props = defineProps({
  nextIndex: {
    type: Number,
    default: 0
  }
})

const Block : {[key:number]: any}  = {
  1: n1,
  2: n2,
  3: n3,
  4: n4,
  5: n5,
  6: n6,
  7: n7,
  8: n8,
  9: n9,
  10: n10,
}

const block = computed(() => {
  if(props.nextIndex in Block){
    return Block[props.nextIndex]
  }
})
</script>
