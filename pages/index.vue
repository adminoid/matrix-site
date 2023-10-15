<template lang="pug">
header
  element-navbar

main
  .container
  .row
    .col
    .col
      button.btn.btn-cpink(type="button") Enter App
    .col

footer Footer
</template>

<script setup>
useHead({
  bodyAttrs: {
    'data-bs-theme': 'dark',
  },
});
</script>

<style lang="sass" scoped>

</style>