<template lang="pug">
.container
  header
    element-navbar

main
  .container
    slot
footer
  .container
    footer-layout
</template>

<script setup>
import FooterLayout from '~/components/FooterLayout.vue'

</script>