<template lang="pug">
.my-rewards-referrals.row.mb-2
  .col-10 Amount of BNB received to the withdrawal (Matrices)
  .col-2.text-end(v-if="isLoaded") {{ totalBnb }}
  .col-2.text-end(v-else) <i>Loading...</i>
</template>

<script setup>
import { useStorage } from '@vueuse/core'

import {getBC} from '~/stores/useWeb3.js'
const BC = await getBC()
const totalBnb = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  // todo => restore mark
  // const eventsFound = await BC.value.getClaimsAppear()
  // let lastAmount
  // for (const evt of eventsFound) {
  //   lastAmount = evt.returnValues.newValue
  // }
  // lastAmount = Number(lastAmount) / 10**18
  // totalBnb.value = lastAmount || 0
  isLoaded.value = true
}

onMounted(async () => {
  await fillEvents()
})

useNuxtApp().$on('wallet-updated', async () => {
  await fillEvents()
})
</script>
