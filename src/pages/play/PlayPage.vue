<template>
  <ZHeader class="pt-12">
    <template v-slot:left>
      <BackButton @click="goBack"/>
    </template>
    <Score :score="score"/>
    <template v-slot:right>
      <Player :name="userStore.nickName"/>
    </template>
  </ZHeader>
  <div class="mt-7 w-full z-10 px-4 flex justify-between">
    <next-block :next-index="nextBlockRef"/>
  </div>
  <canvas ref="canvas" class="border-x-2 border-[#489B6D] w-full"/>
  <ground :height="groundHeight"/>
  <game-over v-if="gameOverRef" :score="score" @replay="onReplay"/>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import NextBlock from './_components/NextBlock.vue'
import GameOver from './_components/GameOver.vue'
import Ground from './_components/Ground.vue'
import Score from './_components/Score.vue'
import {usePlayer} from '../../hooks/use-player.ts'
import ZHeader from '../../components/ZHeader.vue'
import BackButton from '../../components/button/BackButton.vue'
import {useRouter} from 'vue-router'
import Player from './_components/Player.vue'
import {useUserStore} from '../../stores/user.ts'

const userStore = useUserStore()
const router = useRouter()
const canvas = ref<HTMLCanvasElement>()
const {score, replay, groundHeight, nextBlockRef, gameOverRef} = usePlayer(canvas)

// todo canvas 미지원 브라우저에 대하여 matter.js 대응 체크
// todo matter.js 하위 브라우저 대응 없을 시 canvas.getContext 함수 유무로 처리

const onReplay = () => {
  replay()
}

const goBack = () => {
  router.back()
}
</script>
