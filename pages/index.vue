<template lang="pug">
.container
  header
    element-navbar

main
  .container
    .row.mt-5
      .col.text-center 1
      .col.text-center 2
      .col.text-center 3

footer Footer
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