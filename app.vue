<template lang="pug">
nuxt-layout(:name="layoutName")
  nuxt-page
alert-modal(
  :alert="alert"
)
</template>

<script setup>
import { onMounted } from 'vue'
import {
  breakpointsBootstrapV5,
  useBreakpoints,
} from '@vueuse/core'
import { useLayoutStore } from '~/stores/useLayout.js'
import { useRoute } from 'vue-router'
import AlertModal from '~/components/AlertModal.vue'

const route = useRoute()

const layoutName = ref('')
layoutName.value = (route.path === '/') ? 'main-page' : 'common-with-auth'

const { $on } = useNuxtApp()

const alert = ref({
  type: '',
  message: '',
})

$on('alert', ({type, message}) => {
  alert.value = {
    type, message
  }
})

onMounted(async () => {
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

const layoutStore = useLayoutStore()

useHead({
  bodyAttrs: {
    'data-bs-theme': 'dark',
    class: computed(() => {
      return (layoutStore.isOpenedSidebar) ? 'is-sidebar-opened' : ''
    }),
  },
})
</script>