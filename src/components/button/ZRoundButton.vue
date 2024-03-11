<template>
  <button :class="style({color})">
    <slot/>
  </button>
</template>
<script setup lang="ts">
import {cva} from 'class-variance-authority'
import {PropType} from 'vue'

defineProps({
  color: {type: String as PropType<ButtonColor>, default: 'primary'}
})

type ButtonColor = 'primary' | 'secondary'

const style = cva(
  [
    'text-black text-body-b',
    'flex justify-between w-14 h-14 rounded-full px-[12px] py-[11px] border-2'
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
