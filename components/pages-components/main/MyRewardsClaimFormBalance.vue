<template lang="pug">
.col-9.mb-3 Account balance
.col-3.text-end {{ claimsBalanceDecimal }} BNB
br
</template>

<script setup>
// TODO: Need to be updated after claim balance withdrawing
import {getBC} from '~/stores/useWeb3.js'
import {isClient} from "@vueuse/core";

let BC

useNuxtApp().$on('initialized', () => {
  getData()
})

useNuxtApp().$on('wallet-updated', () => {
  getData()
})

const claimsBalanceDecimal = ref(0)
const getData = () => {
  if (!isClient) return
  BC = getBC()
  if (BC && BC.value && BC.value.CoreUser) {
    const claimsBalance = BC.value.CoreUser.claims
    if (claimsBalance) {
      claimsBalanceDecimal.value = Number(claimsBalance) / 10**18
    }
  }
}
</script>
