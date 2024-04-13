import { createRouter, createWebHistory } from 'vue-router'
import PlayPage from '../pages/play/PlayPage.vue'
import RankPage from '../pages/rank/RankPage.vue'
import DevHomePage from '../event-pages/home/DevHomePage.vue'
// import MaintenancePage from '@/event-pages/home/MaintenancePage.vue'

const routes = [
  {
    path: '/',
    component: DevHomePage,
  },
  {
    path: '/play',
    component: PlayPage,
  },
  {
    path: '/rank',
    component: RankPage,
  },
  // {
  //   path: '/',
  //   component: MaintenancePage,
  // },
]

const router = createRouter({
  history: createWebHistory('/watermelon-qa'),
  routes,
})

// router.beforeEach((to) => {
//   if (to.fullPath !== '/') {
//     return { path: '/' }
//   }
// })

export default router
