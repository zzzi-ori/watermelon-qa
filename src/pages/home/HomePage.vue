<template>
  <div class="flex flex-col flex-1 justify-center items-center pt-6 px-6">
    <img :src="zzioGame" alt="zzio game"/>
    <img :src="title" alt="황금 찌오를 찾아라 beta" class="my-8"/>
    <img :src="illustration" alt="찌오 이미지" class="mb-6"/>
    <div v-if="closedRef" class="flex flex-col items-center w-full">
      <ZButton color="secondary" :disabled="true">3월 말 오픈 예정</ZButton>
    </div>
    <div v-else class="flex flex-col items-center w-full">
      <ZInput v-model="userStore.nickName"/>
      <ZButton @click="onClickPlay" color="primary" :disabled="!userStore.nickName" class="mt-2">게임 시작</ZButton>
      <ZButton
          @click="onClickRank"
          color="secondary"
          :disabled="false"
          class="mt-6"
      >
        실시간 랭킹
      </ZButton>
    </div>
    <Notice :closed="closedRef"/>
  </div>
  <Footer/>
</template>
<script setup lang="ts">
import zzioGame from '../../assets/zzio-game.svg'
import title from '../../assets/title-beta.svg'
import illustration from '../../assets/illustration.svg'
import ZButton from '../../components/button/ZButton.vue'
import Footer from '../../components/Footer.vue'
import {onBeforeUnmount, ref, watch} from 'vue'
import Notice from './_components/Notice.vue'
import ZInput from '../../components/ZInput.vue'
import {useRouter} from 'vue-router'
import {useUserStore} from '../../stores/user.ts'

const router = useRouter()
const userStore = useUserStore()

const closedRef = ref(false)
const currentTime = ref(new Date())
const targetTime = new Date('2024-03-17T19:00:00+09:00')
const interval = setInterval(() => {
  currentTime.value = new Date()
}, 1000)

watch(currentTime, () => {
  if (currentTime.value > targetTime) {
    closedRef.value = true
  }
})

onBeforeUnmount(() => clearInterval(interval))

const onClickPlay = () => {
  router.push('/play')
}

const onClickRank = () => {
  router.push('/rank')
}

</script>
