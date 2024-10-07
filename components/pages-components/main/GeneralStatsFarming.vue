<template lang="pug">
.col
  main-banner(
    :isShowed="isLoaded"
    header="Amount of BNB sent to farming and staking"
    :footer="totalForId0"
  )
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import {getBC} from '~/stores/useWeb3.js'
import {isClient} from "@vueuse/core";

// TODO: Events that need to calculate amount for id0 and id1 (there is id0):
//  BelowTwoAppear(address indexed receiver, uint amount, uint indexed matrixIndex)
//  ClaimsAppear(address indexed owner, uint indexed levelPrice, uint newValue)

let BC

useNuxtApp().$on('initialized', async () => {
  await getTotalForId0()
})

useNuxtApp().$on('wallet-updated', async () => {
  await getTotalForId0()
})

const totalForId0 = ref(0)
const isLoaded = ref(false)
const getTotalForId0 = async () => {
  if (!isClient) return;
  BC = getBC()
  if (BC && BC.value) {
    const cnf = useRuntimeConfig()
    totalForId0.value = await BC.value.getIncomesForId(cnf.public.ID_ADDRESS_0)
  }
  isLoaded.value = true
}
</script>