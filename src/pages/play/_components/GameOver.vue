<template>
  <div
    class="absolute inset-0 flex flex-col items-center justify-center z-50 bg-transBlack-50 px-6"
  >
    <div class="mb-2">
      <div :class="topBannerStyle">
        <div
          v-if="activeBanner === 'bottom'"
          @click="toggleBanner('top')"
          class="flex items-center justify-end w-full"
        >
          <span class="text-banner-r">
            잠시만요!
            <br />
            <strong class="text-banner-b">이벤트 참여하면 상품</strong>
            을 받을 수 있어요
          </span>
          <img :src="giftZzio" alt="gift-zzio" class="w-[60.4px] h-[64.75px]" />
          <img :src="arrow" alt="arrow" class="rotate-180 h-6" />
        </div>
        <div
          v-else
          @click="toggleBanner('bottom')"
          class="w-full flex justify-end items-center"
        >
          <img :src="eventTitle" alt="event title" />
          <img :src="arrow" alt="arrow" class="h-6 ml-[42px]" />
        </div>
      </div>
      <div
        v-if="activeBanner === 'top'"
        class="w-[340px] border-2 border-black border-t-0 bg-light-green"
      >
        <div>
          <span>🎁찌오게임 TOP4를 위한 특별한 선물🎁</span>
          <span>
            닉네임과 전화번호를 입력해 이벤트 참여하고 찌오 바디필로우(1명)부터
            찌오 소형인형(3명)까지 찌오가 준비한 선물 받아가세요! (~4/19)
          </span>
        </div>
        <div>
          <label>닉네임</label>
          <ZInput />
          <label>전화번호</label>
          <ZInput />
          <input type="checkbox" />
          <div>[필수] 개인정보 수집, 이용동의 보기</div>
          <ZButton>이벤트 참여하기</ZButton>
        </div>
      </div>
    </div>
    <div
      @click="toggleBanner('bottom')"
      class="bg-white flex flex-col gap-6 px-6 py-6 justify-center items-center rounded-2xl border-2 border-black"
    >
      <img :src="gameOver" alt="game over" />
      <div class="text-body-b px-2 border-2 rounded">
        {{ nickname }}
      </div>
      <img :src="gameOverZzio" alt="zzio" />
      <div class="w-full text-body-r">
        <div class="w-full flex justify-between">
          <span>점수</span>
          <div class="text-body-b flex gap-1">
            <span>{{ score }}</span>
            <img :src="coinSm" alt="코인" />
          </div>
        </div>
        <div class="w-full flex justify-between">
          <span>순위</span>
          <span class="text-body-b">{{ rank }}등 / {{ total }}명</span>
        </div>
      </div>
      <div class="flex gap-4">
        <ZRoundButton
          :color="'secondary'"
          @click="$emit('back')"
          title="처음으로"
        >
          <img :src="home" alt="홈" />
        </ZRoundButton>
        <ZRoundButton
          :color="'primary'"
          @click="$emit('replay')"
          title="다시하기"
        >
          <img :src="replay" alt="다시하기" />
        </ZRoundButton>
      </div>
      <img
        class="max-w-72"
        :src="rankBanner"
        alt="실시간 랭킹 바로가기"
        @click="$emit('rank')"
      />
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
import eventTitle from '@/assets/event-title.svg'
import { usePostRank } from '../../../requests/use/usePostRank.ts'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { usePostEvent } from '@/requests/use/usePostEvent.ts'
import ZInput from '@/components/ZInput.vue'
import ZButton from '@/components/button/ZButton.vue'

const props = defineProps({
  nickname: {
    type: String,
    default: '',
  },
  score: {
    type: Number,
    default: 0,
  },
})

const { data, mutate } = usePostRank()
// const {mutate: mutateEvent} = usePostEvent()

const rank = computed(() => data?.value?.rank)
const total = computed(() => data?.value?.count)
// const userId = computed(() => data?.value?.userId)

const activeBanner = ref<string>('bottom')
const topBannerStyle = computed(() => [
  activeBanner.value === 'top' ? 'rounded-t-2xl' : 'rounded-2xl',
  'bg-gradient-to-r w-[340px] from-gradient-yellow to-gradient-pink p-4 border-2 border-black',
])

const isOpen = () => {
  const current = new Date()
  const closeTime = new Date('2024-04-19T23:59:59+09:00')
  return current < closeTime
}

const toggleBanner = (position: string) => {
  activeBanner.value = position
  console.log(activeBanner.value)
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
