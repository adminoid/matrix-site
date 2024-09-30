<template lang="pug">
.my-rewards-referrals.row.mb-2
  .col-10 Amount of BNB received to the withdrawal (Referral)
  .col-2.text-end(v-if="isLoaded") {{ totalBnb }}
  .col-2.text-end(v-else) <i>Loading...</i>
</template>

<script setup>
import {getBC} from '~/stores/useWeb3.js'

const BC = await getBC()
const totalBnb = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  // todo => restore mark
  // const eventsFound = await BC.value.getReferralEarn()
  // let amount = 0n
  // for (const evt of eventsFound) {
  //   amount += evt?.returnValues.newValue
  // }
  // totalBnb.value = Number(amount) / 10**18
  isLoaded.value = true
}

onMounted(async () => {
  await fillEvents()
})

useNuxtApp().$on('wallet-updated', async () => {
  await fillEvents()
})
</script>
