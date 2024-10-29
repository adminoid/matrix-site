<template lang="pug">
.my-rewards-referrals.row.mb-2
  .col-10 Accounts are connected via referral link
  .col-2.text-end(v-if="isLoaded") {{ total }}
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

const total = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  if (!isClient) return
  BC = getBC()
  if (BC && BC.value) {
    const eventsFound = await GetEvents('WhoseRegistered', [null, BC.value.Wallet])
    if (eventsFound && eventsFound.length > 0) {
      total.value = eventsFound.length
    }
  }
  isLoaded.value = true
}
</script>
