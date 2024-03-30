<template>
  <div>
    <Rank v-for="item in list" :item="item" v-bind:key="item?.rank"/>
  </div>
</template>
<script setup lang="ts">

import {PropType} from 'vue'
import {RankItem} from '../../../requests/fetch/getRank.ts'
import Rank from './Rank.vue'

defineProps({
  list: {
    type: Object as PropType<RankItem[]>,
  },
})
</script>
