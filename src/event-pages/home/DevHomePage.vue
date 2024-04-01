<template>
  <a href="https://www.instagram.com/zzzi_ori" target="_blank">
    <Counter :target="closeTime" :current="currentRef" class="mt-3"/>
  </a>
  <div class="flex flex-col flex-1 items-center px-6">
    <img :src="zzioGame" alt="zzio game" class="mt-6"/>
    <img :src="title" alt="황금 찌오를 찾아라 beta" class="mt-8 mb-2"/>
    <img :src="illustration" alt="찌오 이미지" class="mb-6"/>
    <ZInput v-model="userStore.nickName"/>
    <ZButton @click="onClickPlay" color="primary" :disabled="!userStore.nickName" class="mt-2">게임 시작</ZButton>
    <ZButton
        v-if="isOpenRef"
        @click="onClickRank"
        color="secondary"
        :disabled="false"
        class="mt-6"
    >
      실시간 랭킹
    </ZButton>
    <Notice :closed="!isOpenRef"/>
  </div>
  <Footer/>
</template>
<script setup lang="ts">
import zzioGame from '../../assets/zzio-game.svg'
import title from '../../assets/title-event.svg'
import illustration from '../../assets/illustration.svg'
import ZButton from '../../components/button/ZButton.vue'
import Footer from '../../components/Footer.vue'
import {computed, onMounted, ref} from 'vue'
import Notice from './_components/Notice.vue'
import ZInput from '../../components/ZInput.vue'
import {useRouter} from 'vue-router'
import {useUserStore} from '../../stores/user.ts'
import Counter from './_components/Counter.vue'

const router = useRouter()
const userStore = useUserStore()

const currentRef = ref<Date>(new Date())
const isOpenRef = computed<boolean | undefined>(() => isOpen(currentRef.value))
const closeTime = new Date('2024-04-19T23:59:59+09:00')

const isOpen = (current: Date) => {
  return current < closeTime
}

onMounted(() => {
  const interval = setInterval(() => {
    currentRef.value = new Date()
  }, 1000)
  return () => clearInterval(interval)
})

const onClickPlay = () => {
  router.push('/play')
}

const onClickRank = () => {
  router.push('/rank')
}
</script>
