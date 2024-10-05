<template lang="pug">
.my-rewards-referrals.row.mb-2
  .col-10 Amount of BNB received to the withdrawal (Matrices)
  .col-2.text-end(v-if="isLoaded") {{ totalBnb }}
  .col-2.text-end(v-else) <i>Loading...</i>
</template>

<script setup>
import {isClient, useStorage} from '@vueuse/core'
import {getBC, isInitialized} from '~/stores/useWeb3.js'
import {GetEvents} from "~/libs/events-infura/abi-events.js";

const BC = await getBC()
const totalBnb = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  if (!isClient) return;
  const eventsFound = await GetEvents('ClaimsAppear')
  let lastAmount
  for (const evt of eventsFound) {
    lastAmount = evt.returnValues.newValue
  }
  lastAmount = Number(lastAmount) / 10**18
  totalBnb.value = lastAmount || 0
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
