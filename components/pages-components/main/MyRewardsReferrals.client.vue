<template lang="pug">
.my-rewards-referrals.row.mb-2
  .col-10 Accounts are connected via referral link
  .col-2.text-end(v-if="isLoaded") {{ total }}
  .col-2.text-end(v-else) <i>Loading...</i>
</template>

<script setup>
import {getBC, isInitialized} from '~/stores/useWeb3.js'
import {GetEvents} from "~/libs/events-infura/abi-events.js";

const BC = await getBC()

const total = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  const eventsFound = await GetEvents('WhoseRegistered')
  total.value = eventsFound.length
  isLoaded.value = true
}

watch(isInitialized, (nv) => {
  if (nv) {
    fillEvents()
  }
})

useNuxtApp().$on('wallet-updated', async () => {
  await fillEvents()
})
</script>
