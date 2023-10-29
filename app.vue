<template lang="pug">
NuxtPage
</template>

<script setup>
import { onMounted } from 'vue'
import {
  breakpointsBootstrapV5,
  useBreakpoints,
} from '@vueuse/core'
import { useLayoutStore } from '~/stores/useLayout.js'

onMounted(() => {
  window.addEventListener('resize', (evt) => {
    const layoutStore = useLayoutStore()
    if (layoutStore.isOpenedSidebar) {
      const breakpoints = useBreakpoints(breakpointsBootstrapV5)
      if (!breakpoints.isSmallerOrEqual('lg')) {
        layoutStore.isOpenedSidebar = false
      }
    }
  })
})
</script>