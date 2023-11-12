import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
  // todo: create folded components with path change
  //    make universal subcomponents instead of chinese noodles
  routes: (_routes) => [
    {
      name: 'main',
      path: '/',
      component: () => import('~/pages/index.vue'),
      children: [
        {
          name: 'statistics',
          path: '/statistics',
          component: () => import('~/pages/statistics.vue'),
        },
      ],
    },
  ],
}
