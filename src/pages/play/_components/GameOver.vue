<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="flex flex-col gap-10 min-w-[300px] px-4 py-4 justify-center items-center bg-white text-4xl rounded-3xl border-2 border-black">
      <h1 class="text-shadow text-[30px] font-black text-[#43F091]">-끝-</h1>
      <p>
        <span class="write">내 점수 : </span><span class="text-shadow text-[30px] font-black text-[#FEBE31]">{{ score }}</span>
      </p>
      <ZButton @click="$emit('replay')" >다시하기</ZButton>
      <img :src="endImage" alt="찌그렁 오리" width="120"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import endImage from '../../../assets/end-image.png'
import ZButton from '../../../components/ZButton.vue'

defineProps({
  score: {
    type: Number,
    default: 0
  }
})
</script>
<style scoped>
.text-shadow {
text-shadow: 2px 0 #000000, -2px 0 #000000, 0 2px #000000, 0 -2px #000000, 1px 1px #000000, -1px -1px #000000, 1px -1px #000000, -1px 1px #000000;
}

.write {
  font-family: GangwonEduHyeonokT_OTFMediumA;
}
</style>
