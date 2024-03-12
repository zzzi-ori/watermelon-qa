<template>
  <ZHeader class="w-full">
    <template v-slot:left>
      <BackButton @click="goBack"/>
    </template>
    <img :src="rank" alt="명예의 찌오당"/>
  </ZHeader>
  <div class="h-full overflow-y-scroll flex flex-col items-center px-6">
  <span class="text-body-b mt-6 mb-4 text-dark-green">
      {{ 0 }}명의 찌오가 함께했찌오
    </span>
    <div class="w-full pt-2 overflow-y-scroll">
      <div class="flex flex-col items-center mb-6">
        <ZLabel text="1등 닉네임"/>
        <img :src="medalZzio" class="mt-2" alt="찌오"/>
      </div>
      <RankList class="w-full" :list="list"/>
    </div>
  </div>
  <Footer/>
</template>
<script setup lang="ts">
import rank from '../../assets/rank.svg'
import ZHeader from '../../components/ZHeader.vue'
import BackButton from '../../components/button/BackButton.vue'

// import {useRouter} from 'vue-router'
import {useGetInfiniteRank} from '../../requests/use/useGetInfiniteRank.ts'
import ZLabel from '../../components/ZLabel.vue'
import medalZzio from '../../assets/medal-zzio.svg'
import Footer from '../../components/Footer.vue'
import RankList from '../../pages/rank/_components/RankList.vue'

// const router = useRouter()
const {fetchNextPage} = useGetInfiniteRank()

const test = {
  nickName: 'dain4',
  score: 22222223,
  rank: 4
}

const list = [
  {
    nickName: 'dain1',
    score: 222222234,
    rank: 1
  },
  {
    nickName: 'dain2',
    score: 123123123,
    rank: 2
  },
  {
    nickName: 'dain3',
    score: 22222223,
    rank: 3
  },
  test,
  test,
  test,
  test,
  test,
  test,
  test,
  test,
  test,
  test,
  test,
  test,
  test,
  test,
]

const goBack = () => {
  fetchNextPage()
  // router.back()
}
</script>
