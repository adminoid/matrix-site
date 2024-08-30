<template lang="pug">
template(v-if="isWalletReady")
  main-intro.row.mb-4
  h5.centered-header Personal account
  .row.row-cols-1.row-cols-md-2.mb-4
    smart-contract-send.col
    referrals.col
  my-rewards.mb-4
  registered-table.mb-4
  h5.centered-header General statistics
  general-stats.mb-4
  registered-global-table.mb-4
  philanthropist-banner.mb-4
  amount-blocks.mb-4
  donation-block.mb-4
template(v-else)
  div Wallet is not connected or registered
</template>

<script setup>
import {useWeb3Store} from "~/stores/useWeb3.vue.js";

import MainIntro from '~/components/pages-components/main/MainIntro.vue'
import SmartContractSend from '~/components/pages-components/main/SmartContractSend.vue'
import Referrals from '~/components/pages-components/main/Referrals.vue'
import MyRewards from '~/components/pages-components/main/MyRewards.vue'
import RegisteredTable from '~/components/pages-components/main/RegisteredTable.vue'
import GeneralStats from '~/components/pages-components/main/GeneralStats.vue'
import RegisteredGlobalTable from '~/components/pages-components/main/RegisteredGlobalTable.vue'
import PhilanthropistBanner from '~/components/pages-components/main/PhilanthropistBanner.vue'
import AmountBlocks from '~/components/pages-components/main/AmountBlocks.vue'
import DonationBlock from '~/components/pages-components/main/DonationBlock.vue'

const route = useRoute()
const W = route.params.w

/**
 * TODO
 *  if connectedWallet changed, update coreUser
 *  all in useWeb3 store
 */

onMounted(async () => {
  // console.log('ddd', $B.Web3)
  // console.log('www', W)
  // console.log('www', $B.Web3.utils.isAddress(W))

  const web3Store = useWeb3Store()

  console.info('main.vue, onMounted, web3Store.$B:', web3Store)

  // if ('Web3' in web3Store.$B && web3Store.$B.Web3.utils.isAddress(W)) {
  //   localStorage.setItem('whose_param', W)
  // }

  // if (route.name !== 'read') {
  //   await navigateTo({ path: '/' })
  // }

})

// TODO: set storage by useStorage for wallet (rename) and whose

</script>
