import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  routes: (_routes) => [
    {
      name: 'main',
      path: '/',
      component: () => import('~/pages/main.vue'),
      children: [
        {
          name: 'main_w',
          path: ':w',
          component: () => import('~/pages/main.vue'),
        },
      ],
    },
  ],
}
