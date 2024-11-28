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

useNuxtApp().$on('initialized', async () => {
  await getTotalAccounts()
})

useNuxtApp().$on('wallet-updated', async () => {
  await getTotalAccounts()
})

const getTotalAccounts = async () => {
  if (!isClient) return;
  BC = getBC()
  if (BC && BC.value) {
    totalRegisteredAccounts.value = Number(await BC.value.getAddressesGlobalTotal()) + 1 - 5
  }
  isLoaded.value = true
}
</script>