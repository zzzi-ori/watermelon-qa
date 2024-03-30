<template>
  <div :class="style({type})">
    <div class="min-w-14">
      <span v-if="item?.rank && item?.rank > 4 ">{{ item?.rank }}</span>
      <img v-else-if="item?.rank===1" :src="medal1" alt="1st"/>
      <img v-else-if="item?.rank===2" :src="medal2" alt="1st"/>
      <img v-else-if="item?.rank===3" :src="medal3" alt="1st"/>
      <img v-else-if="item?.rank===4" :src="medal4" alt="1st"/>
    </div>
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
import medal1 from '../../../assets/medal1.svg'
import medal2 from '../../../assets/medal2.svg'
import medal3 from '../../../assets/medal3.svg'
import medal4 from '../../../assets/medal4.svg'
import coinSm from '../../../assets/coin-sm.svg'
import {cva} from 'class-variance-authority'

const props = defineProps({
  item: {
    type: Object as PropType<RankItem>,
  },
})

const type = computed(() => {
  if (props?.item && props.item?.rank <= 4) {
    return 'highlight'
  }
  return 'normal'
})

const style = cva(
  [
    'flex w-full text-body-b py-2',
  ]
  , {
    variants: {
      type: {
        'highlight': 'rounded-lg bg-white mt-1 border-2 pl-2 pr-4',
        'normal': 'border-b-solid border-b-2 border-b-dark-green px-4'
      }
    },
  })
</script>
