<template lang="pug">
main-banner(
  :isShowed="isLoaded"
  header="Amount of BNB received from id1 to help animals"
  link=true
  :footer="totalForId1"
)
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import {getBC} from '~/stores/useWeb3.js'
import {useNuxtApp} from "#app";

const BC = await getBC()

const totalForId1 = ref(0)
const isLoaded = ref(false)
const getTotalForId1 = async () => {
  const cnf = useRuntimeConfig()
  const amount = await BC.value.getIncomesForId(cnf.public.ID_ADDRESS_1)
  if (amount) {
    totalForId1.value = amount
  }
  isLoaded.value = true
}

onMounted(async () => {
  await getTotalForId1()
})

useNuxtApp().$on('wallet-updated', async () => {
  await getTotalForId1()
})
</script>
