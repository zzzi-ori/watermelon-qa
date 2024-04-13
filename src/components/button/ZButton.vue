<template>
  <button :class="style({disabled, color})" :disabled="disabled">
    <LeftLine />
    <slot />
    <RightLine />
  </button>
</template>
<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { PropType } from 'vue'
import LeftLine from '../../components/button/_assets/LeftLine.vue'
import RightLine from '../../components/button/_assets/RightLine.vue'

defineProps({
  disabled: { type: Boolean, default: false },
  color: { type: String as PropType<ButtonColor>, default: 'primary' },
})

type ButtonColor = 'primary' | 'secondary'

const style = cva(
  [
    'text-black text-body-b',
    'flex justify-between w-full rounded-[8px] px-[12px] py-[11px] border-2',
  ]
  , {
    variants: {
      disabled: {
        true: 'border-transBlack-15 text-transBlack-15 bg-transBlack-10',
        false: 'border-black',
      },
      color: {
        'primary': 'bg-[#FCBF31]',
        'secondary': 'bg-green',
      },
    },
  })
</script>
