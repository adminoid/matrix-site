<template lang="pug">
.container
  header
    element-navbar

main
  .container
    pre layouts/Common.vue
    div(v-if="true")
      slot
    div(v-else) Unauthorize
footer
  .container
    footer-layout
</template>

<script setup>
import FooterLayout from '~/components/FooterLayout.vue'
// const { $B } = useNuxtApp()
// const wallet = ref($B.Wallet)

// console.info('wallet')
// console.log(wallet)

console.info('CommonWithAuth $B.Wallet')
// console.log($B.Wallet)
// watch($B.Wallet, (newVal) => {
//   console.info('watch(wallet, (newVal)')
//   if (newVal) {
//     wallet.value = $B.Wallet
//     console.info(newVal)
//   }
// })

// setTimeout(() => {
//   console.log('$B.Wallet', $B.Wallet)
// }, 3000)


</script>