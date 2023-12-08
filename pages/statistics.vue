<template lang="pug">
h1 page: ___statistics 11111111
statistics-wrapper
</template>

<script lang="ts" setup>
import StatisticsWrapper from '~/components/pages-components/statistics/StatisticsWrapper.vue'

import {useWeb3Store} from "~/stores/useWeb3.js";
const web3Store = useWeb3Store()

onMounted(async () => {
  console.info('onMounted with PINIA')
  if (!web3Store.connectedWallet) {
    await web3Store.connectWallet()
  }

  if (!web3Store.connectedWallet) {
    console.warn('wallet not connected!!!')
  } else {
    console.warn('wallet connected!!!')

    // todo: make queries to rpc for getting further information
  }
})
</script>
