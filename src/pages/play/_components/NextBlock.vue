<template>
  <div class="flex justify-center items-center bg-[#FCBF31] rounded-[10px] w-28 py-1 border-2 border-black">
      <span class="text-[18px] mr-3 font-bold" >NEXT</span>
      <img :src="block" class="w-[26px] h-[26px]" />
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import n1 from '/src/assets/next/n1.png'
import n2 from '/src/assets/next/n2.png'
import n3 from '/src/assets/next/n3.png'
import n4 from '/src/assets/next/n4.png'
import n5 from '/src/assets/next/n5.png'
import n6 from '/src/assets/next/n6.png'
import n7 from '/src/assets/next/n7.png'
import n8 from '/src/assets/next/n8.png'
import n9 from '/src/assets/next/n9.png'
import n10 from '/src/assets/next/n10.png'

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
