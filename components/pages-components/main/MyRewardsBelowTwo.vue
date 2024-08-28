<template lang="pug">
.my-rewards-referrals.row.mb-2
  .col-10 Amount of BNB received to the wallet
  .col-2.text-end(v-if="isLoaded") {{ totalBnb }}
  .col-2.text-end(v-else) <i>Loading...</i>
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()
const totalBnb = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  const eventsFound = await web3Store.getBelowTwoAppear()
  let amount = 0n
  if (eventsFound.length > 0) {
    for (const evt of eventsFound) {
      amount = amount + evt?.returnValues.amount
    }
  } else {
    amount = 0
  }

  totalBnb.value = Number(amount) / 10**18
  isLoaded.value = true
}

onMounted(async () => {
  await fillEvents()
})

const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillEvents()
})
</script>
