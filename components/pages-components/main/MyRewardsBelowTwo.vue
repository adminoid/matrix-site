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

let BC

useNuxtApp().$on('initialized', async () => {
  await fillEvents()
})

useNuxtApp().$on('wallet-updated', async () => {
  await fillEvents()
})

const totalBnb = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  if (!isClient) return
  BC = getBC()
  if (BC && BC.value) {
    const eventsFound = await GetEvents('BelowTwoAppear', [BC.value.Wallet])
    let amount = 0n
    if (eventsFound && eventsFound.length > 0) {
      for (const evt of eventsFound) {
        amount = amount + evt.amount
      }
    } else {
      amount = 0
    }
    totalBnb.value = Number(amount) / 10**18
  }
  isLoaded.value = true
}
</script>
