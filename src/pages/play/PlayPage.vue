<template>
  <div ref="canvas" class=""></div>
</template>
<script setup lang="ts">
import {Engine, Render, Bodies, Composite, World, Runner} from 'matter-js'
import {onMounted, ref} from "vue";

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
  const line = Bodies.rectangle(width/2, 150, width, 2, {
    isStatic: true,
    isSensor: true,
    render: {fillStyle: '#FFBF36'}
  })
  Composite.add(engine.world, [line, ground]);

  // run the renderer
  Render.run(render);

  // create runner
  const runner = Runner.create();
  Runner.run(runner, engine);
})

const addBlock = () => {
  const index = Math.floor(Math.random() * 5)
  const circle = Bodies.circle(300, 50, index * 20)
  World.add(engine.world, circle)
}

window.addEventListener('click', ()=>{
  addBlock()
})
window.addEventListener('touchstart', ()=>{
  addBlock()
});


</script>
