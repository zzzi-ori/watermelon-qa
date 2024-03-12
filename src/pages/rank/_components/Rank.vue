<template>
  <div :class="style({type})">
    <span class="min-w-14">{{ item?.rank }}</span>
    <span class="flex-1 text-caption-b">{{ item?.nickName }}</span>
    <div class="flex text-body-b">
      <span class="pr-1">{{ item?.score }}</span>
      <img :src="coinSm" alt="코인"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, PropType} from 'vue'
import {RankItem} from '../../../requests/fetch/getRank.ts'
import coinSm from '@/assets/coin-sm.svg'
import {cva} from 'class-variance-authority'

const props = defineProps({
  item: {
    type: Object as PropType<RankItem>,
  },
})

const type = computed(() => {
  if (props?.item && props.item?.rank <= 3) {
    return 'highlight'
  }
  return 'normal'
})

const style = cva(
  [
    'flex w-full text-body-b px-4 py-2',
  ]
  , {
    variants: {
      type: {
        'highlight': 'rounded-lg bg-white mt-1 border',
        'normal': 'border-b-solid border-b-2 border-b-dark-green last:border-none'
      }
    },
  })
</script>
