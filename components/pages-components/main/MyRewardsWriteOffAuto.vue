<template lang="pug">
.my-rewards-withdrawals.row.mb-2
  .col-10 Write-off of funds for auto turn
  .col-2.text-end(v-if="isLoaded") {{ totalBnb }}
  .col-2.text-end(v-else) <i>Loading...</i>
</template>

<script setup>
import {getBC} from '~/stores/useWeb3.js'
import {isClient} from "@vueuse/core";
import {GetEvents} from "~/libs/events-infura/abi-events.js";

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
    // it is the method for claims spent for next level turn
    const eventsFound = await GetEvents('ClaimsSpent', [BC.value.Wallet])
    if (eventsFound && eventsFound.length > 0) {
      let lastAmount = 0n
      for (const evt of eventsFound) {
        lastAmount += evt.value
      }
      totalBnb.value = Number(lastAmount) / 10**18
    }
  }
  isLoaded.value = true
}
</script>
