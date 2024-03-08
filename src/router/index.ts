import {createRouter, createWebHistory} from 'vue-router'
import PlayPage from '../pages/play/PlayPage.vue'
import HomePage from '../pages/home/HomePage.vue'
import RankPage from '../pages/rank/RankPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/play',
    component: PlayPage,
  },
  {
    path: '/rank',
    component: RankPage,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
