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
import {isClient} from "@vueuse/core";
const totalRegisteredAccounts = ref(0)
const isLoaded = ref(false)
let BC

const getTotalAccounts = async () => {
  if (!isClient) return;
  if (BC.value) {
    totalRegisteredAccounts.value = await BC.value.getAddressesGlobalTotal()
    isLoaded.value = true
  }
}

watch(isInitialized, async (nv) => {
  if (nv && !isLoaded.value) {
    BC = getBC()
    await getTotalAccounts()
  }
})

useNuxtApp().$on('wallet-updated', async (wallet) => {
  if (wallet && BC && BC.value) {
    await getTotalAccounts()
  }
})
</script>