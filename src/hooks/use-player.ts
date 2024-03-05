import {Body, Engine, Events, Render, Runner, World} from 'matter-js'
import {blocks} from '../pages/play/setting.ts'
import {createBlock, getBlockIndex, getDynamicCanvasHeight, setField} from '../utils'
import {computed, onMounted, Ref, ref, watch} from 'vue'
import {useTimer} from './use-timer.ts'

export const usePlayer = (element: Ref<HTMLCanvasElement | undefined>) => {
  const engine = Engine.create({gravity: {x: 0, y: 1}})
  const runner = Runner.create()

  const scoreRef = ref(0)
  const collisions = ref<Set<number>>(new Set())

  const widthRef = ref(0)
  const heightRef = ref(0)
  const ratioRef = computed(() => widthRef.value / 380)

  const isSetBlock = ref(false)
  const gameOverRef = ref(false)

  const groundHeight = computed(() => window.innerHeight - heightRef.value)


  const nextBlockRef = ref(0)
  const currentBlockRef = ref<Body | null>(null)
  const totalBlockCountRef = ref(0)

  onMounted(() => {
    if (!element.value) {
      return
    }
    const width = element.value.clientWidth
    const height = getDynamicCanvasHeight(width)
    widthRef.value = width
    heightRef.value = height

    setNextBlock()
    addBlock()

    // //todo 화면 너비에 다른 블럭 사이즈 조절
    const render = Render.create({
      canvas: element.value,
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

    element.value.addEventListener('mousemove', (event: MouseEvent) => {
      onDrag(event.offsetX)
    })

    element.value.addEventListener('mouseup', () => {
      drop()
    })

    element.value.addEventListener('touchmove', (event: TouchEvent) => {
      onDrag(event.touches[0].clientX)
    }, {passive: true})

    element.value.addEventListener('touchend', () => {
      drop()
    })
  })

  Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {
      console.log(collision.bodyA.label, collision.bodyB.label, '충돌:', collision.bodyA.id, collision.bodyB.id)
      if (collision.bodyA.label === 'removed' || collision.bodyB.label === 'removed') {
        return
      }
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

      collision.bodyA.label = 'removed'
      collision.bodyB.label = 'removed'

      scoreRef.value = scoreRef.value + (blocks[index].score)

      const newBlock = createBlock(index + 1, collision.collision.supports[0].x, collision.collision.supports[0].y, ratioRef.value)
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

  const {start, reset} = useTimer(3, () => {
    endGame()
  })

  watch(collisions.value, (value) => {
    if (value.size > 0) {
      start()
    }
    if (value.size === 0) {
      reset()
    }
  })

  const addBlock = () => {
    currentBlockRef.value = createBlock(nextBlockRef.value, widthRef.value / 2, 80, ratioRef.value, true)
    isSetBlock.value = false
    World.add(engine.world, currentBlockRef.value)
    setNextBlock()
  }

  const setNextBlock = () => {
    totalBlockCountRef.value += 1
    nextBlockRef.value = getBlockIndex(totalBlockCountRef.value)
  }

  const drop = () => {
    if (gameOverRef.value) {
      return
    }
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
    if (gameOverRef.value) {
      return
    }
    if (!currentBlockRef.value || isSetBlock.value) {
      return
    }
    Body.setPosition(currentBlockRef.value, {x, y: 80})
  }

  const replay = () => {
    // todo : 새로고침 성능 확인
    location.reload()
  }

  const endGame = () => {
    gameOverRef.value = true
  }

  return {engine, runner, score: scoreRef, collisions, replay, drop, groundHeight, nextBlockRef, gameOverRef}
}
