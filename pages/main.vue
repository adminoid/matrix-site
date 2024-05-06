<template lang="pug">
main-intro
</template>

<script setup>
import MainIntro from '~/components/pages-components/main/MainIntro.vue'

const { $B } = useNuxtApp()
const route = useRoute()
const W = route.params.w

// onMounted(() => {
//   console.log('ddd', $B.Web3)
//   console.log('www', W)
//   console.log('www', $B.Web3.utils.isAddress(W))
// })

// TODO: set storage by useStorage for wallet (rename) and whose

// if ($B.Web3.utils.isAddress(W)) {
//   localStorage.setItem('whose_param', W)
// }
// if (route.name !== 'read') {
//   await navigateTo({ path: '/' })
// }

</script>