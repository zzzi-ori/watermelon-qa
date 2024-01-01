<template>
  <div class="absolute z-10">
    <span>score: {{score}}</span>
    <div class="bg-amber-300">Next</div>
  </div>
  <div ref="canvas" class=""></div>
</template>
<script setup lang="ts">
import {Engine, Render, Bodies, Composite, World, Runner, Events} from 'matter-js'
import {onMounted, ref} from "vue";
import {blocks} from "./setting.ts";

const score = ref(0)

const canvas = ref<HTMLElement>()
const engine = Engine.create({gravity: {x:0, y:1}})

onMounted(()=>{
  const width = window.innerWidth
  const height = window.innerHeight
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

  const ground = Bodies.rectangle(width/2, height-60, width, 120, { isStatic: true, render: {fillStyle: '#FFBF36'}});
  const left = Bodies.rectangle(0, height/2, 1, height, {
    isStatic: true,
    render: {fillStyle: '#FFFFFF'}
  })
  const right = Bodies.rectangle(width, height/2, 1, height, {
    isStatic: true,
    render: {fillStyle: '#FFFFFF'}
  })
  const line = Bodies.rectangle(width/2, 150, width, 2, {
    isStatic: true,
    isSensor: true,
    render: {fillStyle: '#FFBF36'}
  })
  Composite.add(engine.world, [line, ground, left, right]);

  // run the renderer
  Render.run(render);

  // create runner
  const runner = Runner.create();
  Runner.run(runner, engine);

  Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {
      if (collision.bodyA.label !== collision.bodyB.label) {
        return
      }
      const index = Number(collision.bodyA.label)
      const nextIndex = String(index + 1)

      score.value = score.value + (index * 10)

      // todo 최고 단계일 경우 처리
      if (index === 10) {
        return
      }

      World.remove(engine.world, [collision.bodyA, collision.bodyB])

      const newCircle = Bodies.circle(
        collision.collision.supports[0].x,
        collision.collision.supports[0].y,
        (index + 1) * 20,
        {
          label: nextIndex,
        }
      )

      World.add(engine.world, newCircle)
      }
    )
  })
})

const addBlock = (x: number) => {
  const index = Math.floor(Math.random() * 5) + 1 // 1 ~ 5
  if(!index){
    return
  }
  const block = blocks[index]
  console.log(index)
  const circle = Bodies.circle(x, 10, block.size/2, {
    label: String(index),
  })
  World.add(engine.world, circle)
}

window.addEventListener('click', (event)=>{
  addBlock(event.clientX)
})
window.addEventListener('touchstart', (event)=>{
  addBlock(event.touches[0].clientX)
})

</script>
