<template>
  <ZHeader class="w-full">
    <template v-slot:left>
      <BackButton @click="goBack"/>
    </template>
    <img :src="rank" alt="명예의 찌오당"/>
  </ZHeader>
  <div v-if="list?.length === 0" class="w-full h-full flex flex-col items-center justify-center text-dark-green">
    <img :src="error" alt="error"/>
    <span class="text-body-b mb-1 mt-4">앗! 아직 참여한 사람이 없찌오</span>
    <span class="text-caption-r">지금 플레이해서 1등을 차지하세요!</span>
  </div>
  <div v-else class="h-full overflow-y-scroll flex flex-col items-center">
    <span class="text-body-b mt-6 mb-4 text-dark-green">
      {{ totalCountRef }}명의 찌오가 함께했찌오
    </span>
    <div ref="container" @scroll="onScroll" class="w-full pt-2 overflow-y-scroll px-6">
      <div class="flex flex-col items-center mb-6">
        <ZLabel v-if="winner" :text="winner"/>
        <img :src="medalZzio" class="mt-2" alt="찌오"/>
      </div>
      <RankList :list="list"/>
      <Footer/>
    </div>
  </div>
  <ZRoundButton v-if="showUpButton" class="absolute right-6 bottom-6" @click="scrollUp">
    <img :src="back" alt="위로가기" class="rotate-90"/>
  </ZRoundButton>
</template>
<script setup lang="ts">
import rank from '../../assets/rank.svg'
import ZHeader from '../../components/ZHeader.vue'
import BackButton from '../../components/button/BackButton.vue'
import {useRouter} from 'vue-router'
import ZLabel from '../../components/ZLabel.vue'
import medalZzio from '../../assets/medal-zzio.svg'
import Footer from '../../components/Footer.vue'
import RankList from '../../pages/rank/_components/RankList.vue'
import {useGetInfiniteRank} from '../../requests/use/useGetInfiniteRank.ts'
import {computed, ref} from 'vue'
import ZRoundButton from '../../components/button/ZRoundButton.vue'
import back from '../../assets/back.svg'
import error from '../../assets/error.svg'

const router = useRouter()
const {data, fetchNextPage} = useGetInfiniteRank()
const container = ref<HTMLElement | null>(null)

const list = computed(() => {
  if (!data) {
    return []
  }
  return data.value?.pages.map((page) => page.rankList ?? []).flat()
})

const totalCountRef = computed(() =>
  data.value?.pages[0].totalCount
)

const winner = computed(() =>
  data.value?.pages[0].rankList[0]?.nickName
)

const showUpButton = ref(false)

const goBack = () => {
  router.back()
}

const OFFSET = 300
let isStarted = false

// todo: scroll throttle or debounce
const onScroll = () => {
  if (!container.value) {
    return
  }
  const {offsetHeight, scrollTop, scrollHeight} = container.value
  showUpButton.value = scrollTop !== 0
  const isEnd = offsetHeight + scrollTop > scrollHeight - OFFSET
  if (isEnd && !isStarted) {
    fetchNextPage()
    isStarted = true
  }
  if (!isEnd) {
    isStarted = false
  }
}

const scrollUp = () => {
  if (!container.value) {
    return
  }
  container.value.scrollTo({top: 0, behavior: 'smooth'})
}
</script>
