<template>
  <layout ref="layoutRef">
    <div class="absolute mt-7 w-full z-10 px-4 flex justify-between">
      <next-block :next-index="nextBlockRef"/>
      <score :score="scoreRef"/>
    </div>
    <img class="absolute top-0 left-0 w-full h-auto -z-10" :src="grassPattern" alt="grass"/>
    <canvas ref="canvas" class="border-x-2 border-[#489B6D]"/>
    <ground :height="groundHeight"/>
    <game-over v-if="gameOverRef" :score="scoreRef" @replay="onReplay"/>
  </layout>
</template>
<script setup lang="ts">
import {Engine, Render, World, Runner, Events, Body} from 'matter-js'
import {ComponentPublicInstance, computed, onMounted, ref, watch} from 'vue'
import {createBlock, getDynamicCanvasHeight, setField, getBlockIndex} from '../../utils'
import NextBlock from './_components/NextBlock.vue'
import GameOver from './_components/GameOver.vue'
import Ground from './_components/Ground.vue'
import grassPattern from '../../assets/grass-pattern.svg'
import {useTimer} from '../../hooks/use-timer.ts'
import Layout from '../../components/Layout.vue'
import Score from './_components/Score.vue'
import {blocks} from './setting.ts'

const layoutRef = ref<ComponentPublicInstance>()
const scoreRef = ref(0)

const nextBlockRef = ref(0)
const currentBlockRef = ref<Body | null>(null)

const isSetBlock = ref(false)
const gameOverRef = ref(false)

const widthRef = ref(0)
const heightRef = ref(0)
const groundHeight = computed(() => window.innerHeight - heightRef.value)

const totalBlockCountRef = ref(0)

const {start, reset} = useTimer(3, () => {
  endGame()
})
const collisions = ref<Set<number>>(new Set())

watch(collisions.value, (value) => {
  if (value.size > 0) {
    start()
  }
  if (value.size === 0) {
    reset()
  }
})

const canvas = ref<HTMLCanvasElement>()
const engine = Engine.create({gravity: {x: 0, y: 1}})
const runner = Runner.create()

// todo canvas 미지원 브라우저에 대하여 matter.js 대응 체크
// todo matter.js 하위 브라우저 대응 없을 시 canvas.getContext 함수 유무로 처리

onMounted(() => {
  const width = layoutRef.value?.$el.clientWidth
  const height = getDynamicCanvasHeight(width)
  widthRef.value = width
  heightRef.value = height

  setNextBlock()
  addBlock()

  //todo 화면 너비에 다른 블럭 사이즈 조절
  const render = Render.create({
    canvas: canvas.value,
    engine,
    options: {
      wireframes: false,
      background: 'transparent',
      width,
      height,
      pixelRatio: window.devicePixelRatio
    }
  })

  setField(engine.world, width, height)
  Render.run(render)
  Runner.run(runner, engine)

  layoutRef.value?.$el.addEventListener('mousemove', (event: MouseEvent) => {
    onDrag(event.offsetX)
  })

  layoutRef.value?.$el.addEventListener('mouseup', () => {
    dropBlock()
  })

  layoutRef.value?.$el.addEventListener('touchmove', (event: TouchEvent) => {
    onDrag(event.touches[0].clientX)
  })

  layoutRef.value?.$el.addEventListener('touchend', () => {
    dropBlock()
  })
})

Events.on(engine, 'collisionStart', (event) => {
  event.pairs.forEach((collision) => {
    if (collision.bodyA.label === 'line' || collision.bodyB.label === 'line') {
      const circle = collision.bodyA.label === 'line' ? collision.bodyB.id : collision.bodyA.id
      collisions.value.add(circle)
    }
    if (collision.bodyA.label !== collision.bodyB.label) {
      return
    }

    const index = Number(collision.bodyA.label)

    if (index === 10) {
      return
    }

    scoreRef.value = scoreRef.value + (blocks[index].score)

    const newBlock = createBlock(10, collision.collision.supports[0].x, collision.collision.supports[0].y)
    World.remove(engine.world, [collision.bodyA, collision.bodyB])
    World.add(engine.world, newBlock)
  }
  )
})

Events.on(engine, 'collisionEnd', (event) => {
  event.pairs.forEach((collision) => {
    if (collision.bodyA.label === 'line' || collision.bodyB.label === 'line') {
      const circle = collision.bodyA.label === 'line' ? collision.bodyB.id : collision.bodyA.id
      collisions.value.delete(circle)
    }
  })
})


const addBlock = () => {
  currentBlockRef.value = createBlock(9, widthRef.value / 2, 80, true)
  isSetBlock.value = false
  World.add(engine.world, currentBlockRef.value)
  setNextBlock()
}

const setNextBlock = () => {
  totalBlockCountRef.value += 1
  nextBlockRef.value = getBlockIndex(totalBlockCountRef.value)
}

const dropBlock = () => {
  if (!currentBlockRef.value || isSetBlock.value) {
    return
  }
  isSetBlock.value = true
  Body.setStatic(currentBlockRef.value, false)
  setTimeout(() => {
    addBlock()
  }, 1000)
}

const onDrag = (x: number) => {
  if (!currentBlockRef.value || isSetBlock.value) {
    return
  }
  Body.setPosition(currentBlockRef.value, {x, y: 80})
}

const onReplay = () => {
  // todo : 새로고침 성능 확인
  location.reload()
}

const endGame = () => {
  gameOverRef.value = true
}
</script>
