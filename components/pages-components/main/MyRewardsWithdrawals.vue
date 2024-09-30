<template lang="pug">
.my-rewards-withdrawals.row.mb-2
  .col-10 Amount of BNB debited from withdrawal
  .col-2.text-end(v-if="isLoaded") {{ totalBnb }}
  .col-2.text-end(v-else) <i>Loading...</i>
</template>

<script setup>
import {getBC} from '~/stores/useWeb3.js'

const BC = await getBC()
const totalBnb = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {

  // todo: look for using alchemy
  // todo: issue description: https://github.com/bnb-chain/bsc/issues/113
  // todo: infura bsc endpoints: https://docs.infura.io/api/network-endpoints#binance-smart-chain

  // todo => restore mark
  // const eventsFound = await BC.value.getWithdrawals()
  // let lastAmount = 0n
  // for (const evt of eventsFound) {
  //   lastAmount += evt?.returnValues?.amount
  // }
  // totalBnb.value = Number(lastAmount) / 10**18
  isLoaded.value = true
}

onMounted(async () => {
  await fillEvents()
})

useNuxtApp().$on('wallet-updated', async () => {
  await fillEvents()
})
</script>
