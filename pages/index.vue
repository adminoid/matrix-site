<template lang="pug">
.container
  header
    element-navbar

main
  .container
    NuxtPage.m-2.mt-5

footer
  .container
    footer-layout
</template>

<script setup>
import { useLayoutStore } from '~/stores/useLayout.js'

const layoutStore = useLayoutStore()

useHead({
  bodyAttrs: {
    'data-bs-theme': 'dark',
    class: computed(() => {
      return (layoutStore.isOpenedSidebar) ? 'is-sidebar-opened' : ''
    }),
  },
});
</script>

<style lang="sass" scoped>

</style>