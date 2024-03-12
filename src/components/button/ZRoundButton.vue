<template>
  <button class="flex flex-col items-center justify-center">
    <div :class="style({color})">
      <slot/>
    </div>
    <div v-if="title" class="text-black text-body-b mt-1">
      {{ title }}
    </div>
  </button>
</template>
<script setup lang="ts">
import {cva} from 'class-variance-authority'
import {PropType} from 'vue'

defineProps({
  color: {type: String as PropType<ButtonColor>, default: 'primary'},
  title: {type: String}
})

type ButtonColor = 'primary' | 'secondary'

const style = cva(
  [
    'flex justify-center items-center w-14 h-14 rounded-full border-2'
  ]
  , {
    variants: {
      color: {
        'primary': 'bg-[#FCBF31]',
        'secondary': 'bg-green'
      }
    },
  })
</script>
