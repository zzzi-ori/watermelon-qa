<template>
  <div class="text-dark-green mt-6 mb-2">
    <img :src="event" class="inline mr-1" alt="beta"/>
    <h3 class="text-caption-b inline">운영 안내</h3>
  </div>
  <ul class="text-caption-r text-dark-green list-disc ml-4">
    <li v-for="text in textRef" v-bind:key="text">{{ text }}</li>
  </ul>
</template>
<script setup lang="ts">
import event from '@/assets/event.svg'
import {computed} from 'vue'

defineProps({
  closed: {type: Boolean, default: false},
})

// todo: 내용 업데이트
const textRef = computed(() => closed ?
  ['현재 찌오 게임 베타 버전은 종료 되었으며, 정식 버전은 24.03.24(일) 이후 오픈 예정입니다.'] :
  ['베타 버전은 24.03.18 (월) 19시 까지만 시범 운영 예정이며, 정식 버전은 24.03.24 (일) 이후 오픈 예정입니다.',
    '베타 버전이 종료된 이후에는 모든 랭킹이 초기화 됩니다.'])
</script>
