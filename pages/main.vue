<template lang="pug">
main-intro.row.mb-4

client-only
  .row.mb-4
    .col-12.col-sm-4
      pre Installed: {{ isInstalled }}
    .col-12.col-sm-4
      pre Connected: {{ isConnected }}
    .col-12.col-sm-4
      pre Registered: {{ isRegistered }}
  .row.mb-4
    pre Connected wallet: {{ connectedWallet }}

//pre {{ checkInstalled() }}

whose-register-form.row.mb-4
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
</template>

<script setup>
import MainIntro from '~/components/pages-components/main/MainIntro.vue'
import WhoseRegisterForm from '~/components/pages-components/main/WhoseRegisterForm.client.vue'
import SmartContractSend from '~/components/pages-components/main/SmartContractSend.vue'
import Referrals from '~/components/pages-components/main/Referrals.vue'
import MyRewards from '~/components/pages-components/main/MyRewards.vue'
import RegisteredTable from '~/components/pages-components/main/RegisteredTable.vue'
import GeneralStats from '~/components/pages-components/main/GeneralStats.vue'
import RegisteredGlobalTable from '~/components/pages-components/main/RegisteredGlobalTable.vue'
import PhilanthropistBanner from '~/components/pages-components/main/PhilanthropistBanner.vue'
import AmountBlocks from '~/components/pages-components/main/AmountBlocks.vue'
import DonationBlock from '~/components/pages-components/main/DonationBlock.vue'
import { checkInstalled, initBC } from "~/stores/useWeb3.js";
import { useStorage } from '@vueuse/core'


useHead({
  bodyAttrs: {
    class: 'is-main-page',
  },
})

const route = useRoute()
const W = route.params.w

const isInstalled = ref(false)

const isConnected = ref(false)

// TODO: watch for changing status
const isRegistered = ref(false)

const connectedWallet = ref('')

let BC
onMounted(async () => {


  // check localStorage wallet and connect if exist
  const walletStorage = useStorage('connected-wallet', '')
  if (walletStorage.value) {
    BC = await initBC()
  }



  // TODO: tidy up below code
  // 1. is BC loaded already?

  // console.info(route)

  if (BC && BC.value) {
    // checking address proper
    if ('Web3MM' in BC.value && BC.value.Web3MM.utils.isAddress(W)) {
      localStorage.setItem('whose-param', W)
      if (route.name !== 'main') {
        await navigateTo({ path: '/' })
      }
    }

    // isInstalled.value = BC.value.isInstalled
    isConnected.value = BC.value.isConnected
    isRegistered.value = BC.value.isRegistered
    connectedWallet.value = BC.value.Wallet
  }

  isInstalled.value = false
  if (checkInstalled() || (BC && BC.value.isInstalled)) {
    isInstalled.value = true
  }
})

useNuxtApp().$on('wallet-updated', async (wallet) => {
  console.info('wallet-updated.........')
  console.log(wallet)
  // if (BC) {
  //   console.log(BC.value.Wallet)
  // }
  connectedWallet.value = wallet
})

</script>
