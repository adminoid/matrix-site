<template lang="pug">
.container
  header
    element-navbar

main
  .container
    p main page is there
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