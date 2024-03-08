<template>
  <button :class="style({disabled, color})" :disabled="disabled">
    <slot/>
  </button>
</template>
<script setup lang="ts">
import {cva} from 'class-variance-authority'
import {PropType} from 'vue'

defineProps({
  disabled: {type: Boolean, default: false},
  color: {type: String as PropType<ButtonColor>, default: 'primary'}
})

type ButtonColor = 'primary' | 'secondary'

const style = cva(
  [
    'text-black text-subtitle',
    'w-full rounded-[8px] px-[12px] py-[12px] border-2'
  ]
  , {
    variants: {
      disabled: {
        true: 'border-dark-green text-dark-green bg-green',
        false: 'border-black'
      },
      color: {
        'primary': 'bg-[#FCBF31]',
        'secondary': 'bg-green'
      }
    },
  })
</script>
