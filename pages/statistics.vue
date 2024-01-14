<template lang="pug">
client-only
  div(v-if="storage")
    div(v-if="isRegistered")
      p Total members: {{ addressesGlobalTotal }}

      referral-link
      br
      br
      br

      yours-referrals
      br
      br
      br

      earn-by-referrals
      br
      br
      br

      claim-spent
      br
      br
      br

      gifts-accrued
      br
      br
      br

      gift-spent
      br
      br
      br

      descendants

    div(v-else) Please register first
  div(v-else) Please connect wallet
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import ReferralLink from '~/components/pages-components/statistics/ReferralLink.vue'
import YoursReferrals from '~/components/pages-components/statistics/YoursReferrals.vue'
import EarnByReferrals from '~/components/pages-components/statistics/EarnByReferrals.vue'
import ClaimSpent from '~/components/pages-components/statistics/ClaimSpent.vue'
import GiftsAccrued from '~/components/pages-components/statistics/GiftsAccrued.vue'
import GiftSpent from '~/components/pages-components/statistics/GiftSpent.vue'
import Descendants from '~/components/pages-components/statistics/Descendants.vue'

import {useWeb3Store} from "~/stores/useWeb3.js";

const web3Store = useWeb3Store()
const isRegistered = ref(false)

const addressesGlobalTotal = ref<number|undefined>(undefined)

// check if wallet registered
onMounted(async () => {
  isRegistered.value = await web3Store.checkRegister()
  addressesGlobalTotal.value = Number(await web3Store.getAddressesGlobalTotal()) + 1
})

const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  isRegistered.value = await web3Store.checkRegister()
})
</script>
