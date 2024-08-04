<template lang="pug">
.my-rewards-withdraws.row.mb-2
  .col-10 Amount of BNB debited from withdrawal
  .col-2.text-end(v-if="isLoaded") {{ totalBnb }}
  .col-2.text-end(v-else) Loading...
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()
const totalBnb = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  const eventsFound = await web3Store.getWithdraws()
  let lastAmount = 0n
  for (const evt of eventsFound) {
    lastAmount += evt?.returnValues?.amount
  }
  totalBnb.value = Number(lastAmount) / 10**18
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
