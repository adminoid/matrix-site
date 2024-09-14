<template lang="pug">
.col-9.mb-3 Account balance
.col-3.text-end {{ claimsBalanceDecimal }} BNB
br
</template>

<script setup>
// TODO: Need to be updated after claim balance withdrawing
import {getBC} from '~/stores/useWeb3.js'

const BC = await getBC()

const claimsBalanceDecimal = ref(0)
const getData = async () => {
  // TODO: make it singleton?
  const claimsBalance = await BC.value.CoreUser.claims
  if (claimsBalance) {
    claimsBalanceDecimal.value = Number(claimsBalance) / 10**18
  }
}

onMounted(async () => {
  await getData()
})

useNuxtApp().$on('wallet-updated', async () => {
  await getData()
})
</script>
