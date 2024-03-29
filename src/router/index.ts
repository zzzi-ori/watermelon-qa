import {createRouter, createWebHistory} from 'vue-router'
import PlayPage from '../pages/play/PlayPage.vue'
import HomePage from '../pages/home/HomePage.vue'
import RankPage from '../pages/rank/RankPage.vue'
import DevHomePage from '../dev-pages/home/DevHomePage.vue'

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
  {
    path: '/dev',
    component: DevHomePage,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
