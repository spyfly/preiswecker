import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
