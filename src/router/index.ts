import { createRouter, createWebHistory } from 'vue-router'
import PlayPage from "../pages/play/PlayPage.vue";

const routes = [
  {
    path: '/',
    component: PlayPage,
  },
]

const router = createRouter({
  history: createWebHistory('/watermelon'),
  routes,
})

export default router
