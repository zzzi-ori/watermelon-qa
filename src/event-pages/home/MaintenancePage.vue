<template>
  <a href="https://www.instagram.com/p/C5anjFMP-9n/?utm_source=ig_web_copy_link" target="_blank">
    <Counter class="mt-3" />
  </a>
  <div class="flex flex-col flex-1 justify-center items-center px-6">
    <img :src="zzioGame" alt="zzio game" class="mt-6" />
    <img :src="title" alt="황금 찌오를 찾아라 beta" class="my-3" />
    <img :src="illustration" alt="찌오 이미지" class="mb-6" />
    <div class="w-full flex flex-col items-center text-dark-green text-center">
      <img :src="error" alt="error" />
      <span class="text-body-b mb-1 mt-4">잠시 게임을 점검중입니다</span>
      <span class="text-caption-r">
        더 나은 찌오 게임을 위해 점검 중입니다.<br />
        점검이 종료되면 다시 게임을 플레이 할 수 있습니다.
      </span>
    </div>
    <ZButton :disabled="true" class="mt-6" color="primary"> 7:00 AM 점검 종료</ZButton>
    <Notice :closed="!isOpenRef" />
  </div>
  <Footer />
</template>
<script lang="ts" setup>
import zzioGame from '../../assets/zzio-game.svg'
import title from '../../assets/title.svg'
import illustration from '../../assets/illustration.svg'
import ZButton from '../../components/button/ZButton.vue'
import Footer from '../../components/Footer.vue'
import Counter from './_components/Counter.vue'
import Notice from './_components/Notice.vue'
import { onMounted, ref } from 'vue'
import { isEventOpen } from '@/utils/check-event-open.ts'
import error from '@/assets/error.svg'

const isOpenRef = ref<boolean>(isEventOpen())

onMounted(() => {
  const interval = setInterval(() => {
    isOpenRef.value = isEventOpen()
  }, 1000)
  return () => clearInterval(interval)
})
</script>
