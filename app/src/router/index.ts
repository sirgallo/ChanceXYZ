import { 
  createRouter, 
  createWebHistory 
} from 'vue-router';

import HomeView from '@views/HomeView.vue';
import StableLottery from '@views/StableLottery.vue';
import AllocationAnalysis from '@views/AllocationAnalysis.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/stable',
      name: 'Stable',
      component: StableLottery
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: AllocationAnalysis
    }
  ]
});

export default router;