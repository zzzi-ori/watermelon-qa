<template>
  <div
    class="absolute inset-0 flex flex-col z-50 bg-transBlack-50 px-6 py-6 overflow-y-scroll hide-scroll"
  >
    <div
      class="w-full bg-white flex flex-col gap-5 pt-10 pb-6 m-auto justify-center items-center rounded-2xl border-2 border-black"
    >
      <img :src="gameOver" alt="game over" />
      <div class="text-body-b px-2 border-2 rounded">
        {{ nickname }}
      </div>
      <img :src="gameOverZzio" alt="zzio" />
      <div class="w-full px-10 text-body-r flex items-center">
        <div class="w-full">
          <div class="w-full flex justify-between">
            <span>점수</span>
            <div class="text-body-b flex gap-1">
              <span>{{ score }}</span>
              <img :src="coinSm" alt="코인" />
            </div>
          </div>
          <div v-if="isEventOpen()" class="w-full flex justify-between">
            <span>순위</span>
            <span class="text-body-b">{{ rank }}등 / {{ total }}명</span>
          </div>
        </div>
      </div>
      <event-drop-down
        v-if="isEventOpen()"
        :nickname="nickname"
        :userId="userId"
      />
      <div class="flex gap-4">
        <ZRoundButton :color="'secondary'" @click="$emit('back')" title="처음으로">
          <img :src="home" alt="홈" />
        </ZRoundButton>
        <ZRoundButton :color="'primary'" @click="$emit('replay')" title="다시하기">
          <img :src="replay" alt="다시하기" />
        </ZRoundButton>
      </div>
      <div class="px-6">
        <rank-banner
          v-if="isEventOpen()"
          @click="$emit('rank')"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gameOver from '@/assets/game-over.svg'
import replay from '@/assets/replay.svg'
import home from '@/assets/home.svg'
import gameOverZzio from '@/assets/game-over-zzio.svg'
import ZRoundButton from '@/components/button/ZRoundButton.vue'
import coinSm from '@/assets/coin-sm.svg'
import { usePostRank } from '@/requests/use/usePostRank.ts'
import { computed, onMounted } from 'vue'
import { getGameId } from '@/utils/get-game-id.ts'
import { isEventOpen } from '@/utils/check-event-open.ts'
import { compressLog } from '@/utils/compress-log.ts'
import RankBanner from '@/pages/play/game-over/_components/RankBanner.vue'
import EventDropDown from '@/pages/play/game-over/_components/EventDropDown.vue'

const props = defineProps({
  nickname: {
    type: String,
    default: '',
  },
  score: {
    type: Number,
    default: 0,
  },
  logData: {
    type: String,
    default: '',
  },
})

const { data, mutate } = usePostRank()

const rank = computed(() => data?.value?.rank)
const total = computed(() => data?.value?.count)
const userId = computed(() => data?.value?.userId)

onMounted(() => {
  // 이벤트 기간 지나지 않았을 경우 rank 등록
  if (props.score && props.nickname && isEventOpen()) {
    mutate({
      score: props.score,
      nickName: props.nickname,
      gameId: getGameId(),
      logData: compressLog(props.logData),
    })
  }
})
</script>
<style setup>
.hide-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scroll::-webkit-scrollbar { /* WebKit */
  width: 0;
  height: 0;
}
</style>
