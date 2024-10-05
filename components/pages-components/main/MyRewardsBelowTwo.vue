<template lang="pug">
  .my-rewards-referrals.row.mb-2
    .col-10 Amount of BNB received to the wallet
    .col-2.text-end(v-if="isLoaded") {{ totalBnb }}
    .col-2.text-end(v-else) <i>Loading...</i>
</template>

<script setup>
import {getBC} from '~/stores/useWeb3.js'
import {GetEvents} from "~/libs/events-infura/abi-events.js";
import {isClient} from "@vueuse/core";

const BC = await getBC()

const totalBnb = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  if (!isClient) return

  const eventsFound = await GetEvents('BelowTwoAppear')
  let amount = 0n
  if (eventsFound.length > 0) {
    for (const evt of eventsFound) {
      amount = amount + evt.amount
    }
  } else {
    amount = 0
  }

  totalBnb.value = Number(amount) / 10**18
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
