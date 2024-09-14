<template lang="pug">
.my-rewards-referrals.row.mb-2
  .col-10 Accounts are connected via referral link
  .col-2.text-end(v-if="isLoaded") {{ total }}
  .col-2.text-end(v-else) <i>Loading...</i>
</template>

<script setup>
import {getBC} from '~/stores/useWeb3.js'

const BC = await getBC()

const total = ref(0)
const isLoaded = ref(false)
const fillEvents = async () => {
  const eventsFound = await BC.value.getWhoseOfUser()
  total.value = eventsFound.length
  isLoaded.value = true
}

onMounted(async () => {
  await fillEvents()
})

useNuxtApp().$on('wallet-updated', async () => {
  await fillEvents()
})
</script>
