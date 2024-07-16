<template lang="pug">
.my-rewards-referrals.row.mb-2
  .col-10 Amount of BNB received to the wallet
  .col-2.text-end(v-if="isLoaded") {{ totalBnb }}
  .col-2.text-end(v-else) Loading...
</template>

<script setup>
import { useStorage } from '@vueuse/core'
// import { ethers } from 'ethers'
import BigNumber from "bignumber.js"

const web3Store = useWeb3Store()
const totalBnb = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  const eventsFound = await web3Store.getClaimsAppear()

  let lastAmount
  for (const evt of eventsFound) {
    const result = new BigNumber(new BigNumber(evt.returnValues.newValue).toNumber() / (new BigNumber(10**18)))
    lastAmount = result.toNumber()
  }

  // totalBnb.value = ethers.toWei(String(lastAmount), "ether")

  totalBnb.value = lastAmount
  console.log(totalBnb.value)
  isLoaded.value = true
}

onMounted(async () => {
  setTimeout(async ()=>{
    await fillEvents()
  }, 7000)
})

const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillEvents()
})
</script>
