<template>
  <input
      :value="modelValue"
      @input="onInupt"
      placeholder="닉네임을 입력하세요"
      :class="style({filled})"
      :maxlength="max"
  >
</template>
<script setup lang="ts">

import {computed} from 'vue'
import {cva} from 'class-variance-authority'

const props = defineProps({
  max: {type: Number, default: 8},
  modelValue: {type: String, default: ''}
})

const emit = defineEmits(['update:model-value'])

const filled = computed(() => props.modelValue.length > 0)

const onInupt = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = target.value.slice(0, 8)
  emit('update:model-value', target.value)
}

const style = cva([
  'w-full text-body-b text-center p-4',
  'rounded-[8px] px-[12px] py-[12px] border-2'
], {
  variants: {
    filled: {
      true: '',
      false: 'border-dark-green'
    }
  }
})
</script>
