import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import DashboardPage from '../views/DashboardPage.vue';
import AudioTrackPage from '../views/AudioTrackPage.vue';
import ImagePage from '../views/ImagePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  
  {
    path: '/home',
    name: 'DashboardPage',
    component: DashboardPage
  },
  {
    path: '/audio-tracks',
    name: 'AudioTrackPage',
    component: AudioTrackPage
  },
  {
    path: '/images',
    name: 'ImagePage',
    component: ImagePage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
