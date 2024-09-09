<template lang="pug">
.my-rewards-referrals.row.mb-2
  .col-10 Accounts are connected via referral link
  .col-2.text-end(v-if="isLoaded") {{ total }}
  .col-2.text-end(v-else) <i>Loading...</i>
</template>

<script setup>
// TODO: remove useStorage from here
import { useStorage } from '@vueuse/core'
import { useWeb3Store } from '~/stores/useWeb3.js'

const BC = await useWeb3Store()

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

const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillEvents()
})
</script>
