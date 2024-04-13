<template>
  <div class="w-full border-y-2 border-transBlack-15 px-6">
    <div class="flex justify-between py-4" @click="onToggleDropDown">
      <div class="flex items-center gap-[6px]">
        <img :src="medal1" alt="트로피" class="max-h-4" />
        <span class="text-body-b">
        랭킹 이벤트 응모하기
      </span>
        <div
          :class="tagStyle({isSuccess})"
        >{{ isSuccess ? '응모완료' : '미응모' }}
        </div>
      </div>
      <img :src="arrow" alt="arrow" :class="arrowStyle({isOpen})" />
    </div>
    <!-- dropdown 내부 -->
    <div v-if="isOpen" class="pb-5">
      <div class="flex items-center gap-1 p-[6px] bg-[#FFF2D6] rounded-[8px]">
        <img :src="eventZzio" alt="zzio" class="max-h-6" />
        <span class="text-caption-b">
          더 높은 점수로 이벤트에 다시 응모하세요!
        </span>
      </div>
      <div class="mt-3">
        <label class="mb-2 block text-body-b">전화번호</label>
        <z-input
          v-model="phoneNumber"
          type="number"
          placeholder="번호를 입력해 주세요 (수정 불가)"
          :max="11"
        />
      </div>
      <div class="mt-5 flex items-center">
        <z-checkbox v-model="isPrivacyPolicyAgreed" />
        <div class="ml-1 text-body-r">
          <strong class="text-body-b">[필수]</strong> 개인정보 수집, 이용동의
        </div>
        <div class="ml-auto cursor-pointer text-body-b" @click="togglePrivacyTerm">보기</div>
      </div>
      <z-button class="mt-4" :disabled="!isFormFilled || isSuccess" @click="onClickSubmit">
        {{ buttonText }}
      </z-button>
    </div>
  </div>
  <privacy-term v-if="isPrivacyTermOpen" @close="togglePrivacyTerm" />
</template>
<script setup lang="ts">
import { usePostEvent } from '@/requests/use/usePostEvent.ts'
import { computed, ref } from 'vue'
import medal1 from '@/assets/medal1.svg'
import eventZzio from '@/assets/event-zzio.svg'
import { cva } from 'class-variance-authority'
import arrow from '@/assets/arrow.svg'
import ZInput from '@/components/ZInput.vue'
import ZButton from '@/components/button/ZButton.vue'
import ZCheckbox from '@/components/ZCheckbox.vue'
import PrivacyTerm from '@/pages/play/_components/PrivacyTerm.vue'

const props = defineProps({
  nickname: {
    type: String,
    default: '',
  },
  userId: {
    type: Number,
  },
})

const isOpen = ref(false)
const isPrivacyTermOpen = ref<boolean>(false)
const isPrivacyPolicyAgreed = ref<boolean>(false)
const phoneNumber = ref<string>('')

const buttonText = computed(() => (isSuccess.value ? '제출완료' : '제출하기'))
const isFormFilled = computed(
  () => props.nickname && phoneNumber.value && isPrivacyPolicyAgreed.value,
)

const { isSuccess, mutate: mutateEvent } = usePostEvent()

const tagStyle = cva(
  ['text-caption-b px-2 py-1 rounded-full'],
  {
    variants: {
      isSuccess: {
        true: 'bg-primary',
        false: 'bg-transBlack-15 text-white',
      },
    },
  },
)

const arrowStyle = cva(
  ['h-6'],
  {
    variants: {
      isOpen: {
        true: '',
        false: 'rotate-180',
      },
    },
  },
)

const onToggleDropDown = () => {
  isOpen.value = !isOpen.value
}

const togglePrivacyTerm = () => {
  isPrivacyTermOpen.value = !isPrivacyTermOpen.value
}

const onClickSubmit = () => {
  if (props.userId) {
    mutateEvent({ userId: props.userId, phoneNumber: phoneNumber.value })
  }
}

</script>
