<template lang="pug">
.container
  header
    element-navbar

main
  .container
    pre layouts/MainPage.vue
    slot

footer
  .container
    footer-layout
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: 'is-main-page',
  },
})
</script>