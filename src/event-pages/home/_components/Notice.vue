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

const props = defineProps({
  closed: {type: Boolean, default: false},
})

const textRef = computed(() => props.closed ?
  ['현재 찌오 게임 이벤트는 종료 되었으며, 당첨자는 4월 26일 (금) 이후 찌오 인스타그램 (@zzzi_ori)에서 확인하실 수 있습니다.', '찌오 게임은 언제든 자유롭게 플레이 가능하나, 실시간 랭킹은 확인하실 수 없습니다.'] :
  ['이벤트는 4월 19일 (금) 23시 59분까지 참여 가능하며, 종료 이후에도 찌오 게임을 언제든 플레이할 수 있습니다.',
    '실시간 랭킹은 이벤트 종료와 동시에 확인이 불가합니다.',
    '자세한 내용은 이벤트 페이지 또는 찌오 인스타그램 (@zzzi_ori)에서 확인하세요.'])
</script>
