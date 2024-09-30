<template lang="pug">
main-banner(
  :isShowed="isLoaded"
  header="Registered accounts"
  :footer="totalRegisteredAccounts"
)
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import {getBC} from '~/stores/useWeb3.js'
const BC = await getBC()
const totalRegisteredAccounts = ref(0)
const isLoaded = ref(false)
const getTotalAccounts = async () => {
  // todo => restore mark
  // totalRegisteredAccounts.value = await BC.value.getAddressesGlobalTotal()
  isLoaded.value = true
}

onMounted(async () => {
  await getTotalAccounts()
})

useNuxtApp().$on('wallet-updated', async () => {
  await getTotalAccounts()
})

// TODO: remove all `useStorage('connected-wallet',`

</script>