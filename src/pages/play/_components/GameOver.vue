<template>
  <div class="absolute inset-0 flex flex-col items-center justify-center z-50 bg-transBlack-50 px-6">
    <div
        class="bg-gradient-to-r relative from-gradient-yellow to-gradient-pink p-4 flex items-center rounded-2xl border-2 border-black mb-2">
      <span class="text-banner-r mr-14">
        잠시만요!
        <br/>
        <strong class="text-banner-b">이벤트 참여하면 상품</strong>
        을 받을 수 있어요
      </span>
      <img :src="giftZzio" alt="gift-zzio" class="absolute right-[36px] bottom-0 w-[60.4px] h-[64.75px]"/>
      <img :src="arrow" alt="arrow" class="rotate-180 h-6"/>
    </div>
    <div class="bg-white flex flex-col gap-6 px-6 py-6 justify-center items-center rounded-2xl border-2 border-black">
      <img :src="gameOver" alt="game over"/>
      <div class="text-body-b px-2 border-2 rounded">
        {{ nickname }}
      </div>
      <img :src="gameOverZzio" alt="zzio"/>
      <div class="w-full text-body-r">
        <div class="w-full flex justify-between">
          <span>점수</span>
          <div class="text-body-b flex gap-1">
            <span>{{ score }}</span>
            <img :src="coinSm" alt="코인"/>
          </div>
        </div>
        <div class="w-full flex justify-between">
          <span>순위</span>
          <span class="text-body-b">{{ rank }}등 / {{ total }}명</span>
        </div>
      </div>
      <div class="flex gap-4">
        <ZRoundButton :color="'secondary'" @click="$emit('back')" title="처음으로">
          <img :src="home" alt="홈"/>
        </ZRoundButton>
        <ZRoundButton :color="'primary'" @click="$emit('replay')" title="다시하기">
          <img :src="replay" alt="다시하기"/>
        </ZRoundButton>
      </div>
      <img class="max-w-72" :src="rankBanner" alt="실시간 랭킹 바로가기" @click="$emit('rank')"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import gameOver from '../../../assets/game-over.svg'
import replay from '../../../assets/replay.svg'
import home from '../../../assets/home.svg'
import gameOverZzio from '../../../assets/game-over-zzio.svg'
import ZRoundButton from '../../../components/button/ZRoundButton.vue'
import rankBanner from '../../../assets/rank-banner.png'
import coinSm from '../../../assets/coin-sm.svg'
import giftZzio from '@/assets/gift-zzio.svg'
import arrow from '@/assets/arrow.svg'
import {usePostRank} from '../../../requests/use/usePostRank.ts'
import {computed, onMounted} from 'vue'
// import {usePostEvent} from '../../../requests/use/usePostEvent.ts'

const props = defineProps({
  nickname: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    default: 0
  }
})

const {data, mutate} = usePostRank()
// const {mutate: mutateEvent} = usePostEvent()

const rank = computed(() => data?.value?.rank)
const total = computed(() => data?.value?.count)
// const userId = computed(() => data?.value?.userId)

const isOpen = () => {
  const current = new Date()
  const closeTime = new Date('2024-04-19T23:59:59+09:00')
  return current < closeTime
}

onMounted(() => {
  // 이벤트 기간 지나지 않았을 경우 rank 등록
  if (props.score && props.nickname && isOpen()) {
    mutate({
      score: props.score,
      nickName: props.nickname,
    })
  }
})
</script>
