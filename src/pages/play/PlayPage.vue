<template>
  <div class="absolute z-10">
    <div class="text-4xl ml-4 my-4">score: {{score}}</div>
    <next-block :next-index="1"/>
  </div>
  <div ref="canvas" class=""></div>
</template>
<script setup lang="ts">
import {Engine, Render, Bodies, Composite, World, Runner, Events} from 'matter-js'
import {onMounted, ref} from "vue";
import {createBlock} from "../../utils";
import NextBlock from "./_components/NextBlock.vue";

const score = ref(0)
const isDropping = ref(false)

const canvas = ref<HTMLElement>()
const engine = Engine.create({gravity: {x:0, y:1}})
const runner = Runner.create();

onMounted(()=>{
  const width = window.innerWidth
  const height = window.innerHeight
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

  const ground = Bodies.rectangle(width/2, height-60, width, 120, { isStatic: true, render: {fillStyle: '#FCBF31', lineWidth:4, strokeStyle:'#000000'}});
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
        if(isDropping.value){
          return
        }
        alert('gameover')
      }
      if (collision.bodyA.label !== collision.bodyB.label) {
        return
      }
      const index = Number(collision.bodyA.label)
      score.value = score.value + (index * 2)

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
  const index = Math.floor(Math.random() * 5) + 1 // 1 ~ 5
  if(!index){
    return
  }
  isDropping.value = true
  const block = createBlock(index, x, 10)
  setTimeout(()=>{isDropping.value=false}, 1000)
  World.add(engine.world, block)
}

window.addEventListener('click', (event)=>{
  if(isDropping.value){
    return
  }
  addBlock(event.clientX)
})
window.addEventListener('touchstart', (event)=>{
  if(isDropping.value){
    return
  }
  addBlock(event.touches[0].clientX)
})

</script>
