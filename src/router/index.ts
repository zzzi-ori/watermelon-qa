import { createRouter, createWebHistory } from 'vue-router'
// import PlayPage from '../pages/play/PlayPage.vue'
// import RankPage from '../pages/rank/RankPage.vue'
// import DevHomePage from '../event-pages/home/DevHomePage.vue'
import MaintenancePage from '@/event-pages/home/MaintenancePage.vue'

const routes = [
  // {
  //   path: '/',
  //   component: DevHomePage,
  // },
  {
    path: '/',
    component: MaintenancePage,
  },
  // {
  //   path: '/play',
  //   component: PlayPage,
  // },
  // {
  //   path: '/rank',
  //   component: RankPage,
  // },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

router.beforeEach((to) => {
  if (to.fullPath !== '/') {
    return { path: '/' }
  }
})

export default router
