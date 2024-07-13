<template lang="pug">
.my-rewards-referrals.row.mb-2
  .col-10 Accounts are connected via referral link
  .col-2.text-end(v-if="isLoaded") {{ total }}
  .col-2.text-end(v-else) Loading...
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()
const total = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  const eventsFound = await web3Store.getWhoseOfUser()
  total.value = eventsFound.length
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
