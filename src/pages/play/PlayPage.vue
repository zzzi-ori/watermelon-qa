<template>
  <div class="absolute z-10">
    <div class="text-4xl ml-4 my-4">score: {{scoreRef}}</div>
    <next-block :next-index="nextBlockRef"/>
  </div>
  <div ref="canvas" class=""></div>
  <game-over v-if="gameOverRef" :score="scoreRef" @replay="onReplay"/>
</template>
<script setup lang="ts">
import {Engine, Render, Bodies, Composite, World, Runner, Events} from 'matter-js'
import {onMounted, ref} from "vue";
import {createBlock} from "../../utils";
import NextBlock from "./_components/NextBlock.vue";
import GameOver from "./_components/GameOver.vue";

const scoreRef = ref(0)
const isDroppingRef = ref(false)
const nextBlockRef = ref(0)
const gameOverRef = ref(false)

const canvas = ref<HTMLElement>()
const engine = Engine.create({gravity: {x:0, y:1}})
const runner = Runner.create();

onMounted(()=>{
  const width = window.innerWidth
  const height = window.innerHeight

  setNextBlock()

  //todo 화면 너비에 다른 블럭 사이즈 조절
  const render = Render.create({
    element: canvas.value,
    engine,
    options: {
      wireframes: false,
      background: 'transparent',
      width,
      height,
      showAngleIndicator: true
    }
  });

  const ground = Bodies.rectangle(width/2, height-48, width, 96, { isStatic: true, render: {fillStyle: '#FCBF31', lineWidth:4, strokeStyle:'#000000'}});
  const left = Bodies.rectangle(0, height/2, 1, height, {
    isStatic: true,
    render: {fillStyle: '#FFFFFF'}
  })
  const right = Bodies.rectangle(width, height/2, 1, height, {
    isStatic: true,
    render: {fillStyle: '#FFFFFF'}
  })
  const line = Bodies.rectangle(width/2, 150, width, 2,  {
    isStatic: true,
    isSensor: true,
    label: 'line',
    render: {fillStyle: '#000000'}
  })
  Composite.add(engine.world, [line, ground, left, right]);

  Render.run(render);
  Runner.run(runner, engine);

  Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {
      if (collision.bodyA.label === 'line' || collision.bodyB.label === 'line'){
        if(isDroppingRef.value){
          return
        }
        gameOverRef.value=true
      }
      if (collision.bodyA.label !== collision.bodyB.label) {
        return
      }
      const index = Number(collision.bodyA.label)
      scoreRef.value = scoreRef.value + (index * 2)

      // todo 최고 단계일 경우 처리
      if (index === 10) {
        return
      }
      const newBlock = createBlock(index+1, collision.collision.supports[0].x, collision.collision.supports[0].y)
      World.remove(engine.world, [collision.bodyA, collision.bodyB])
      World.add(engine.world, newBlock)
      }
    )
  })
})

const addBlock = (x: number) => {
  if(!nextBlockRef.value){
    return
  }
  isDroppingRef.value = true
  const block = createBlock(nextBlockRef.value, x, 10)
  setNextBlock()
  setTimeout(()=>{isDroppingRef.value=false}, 1000)
  World.add(engine.world, block)
}

const setNextBlock = () => {
  nextBlockRef.value = Math.floor(Math.random() * 5) + 1 // 1 ~ 5
}

const onReplay = () => {
  // todo : 새로고침 성능 확인
  location.reload()
}

window.addEventListener('click', (event)=>{
  if(isDroppingRef.value){
    return
  }
  addBlock(event.clientX)
})
window.addEventListener('touchstart', (event)=>{
  if(isDroppingRef.value){
    return
  }
  addBlock(event.touches[0].clientX)
})

</script>
