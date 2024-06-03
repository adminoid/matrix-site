<template lang="pug">
main-intro.mb-4
personal-account.mb-4
referrals.mb-4
my-rewards.mb-4
registered-table.mb-4
general-stats.mb-4
registered-global-table.mb-4
philanthropist-banner.mb-4
amount-blocks.mb-4
donation-block.mb-4
</template>

<script setup>
import MainIntro from '~/components/pages-components/main/MainIntro.vue'
import PersonalAccount from '~/components/pages-components/main/PersonalAccount.vue'
import Referrals from '~/components/pages-components/main/Referrals.vue'
import MyRewards from '~/components/pages-components/main/MyRewards.vue'
import RegisteredTable from '~/components/pages-components/main/RegisteredTable.vue'
import GeneralStats from '~/components/pages-components/main/GeneralStats.vue'
import RegisteredGlobalTable from '~/components/pages-components/main/RegisteredGlobalTable.vue'
import PhilanthropistBanner from '~/components/pages-components/main/PhilanthropistBanner.vue'
import AmountBlocks from '~/components/pages-components/main/AmountBlocks.vue'
import DonationBlock from '~/components/pages-components/main/DonationBlock.vue'

const {
  $B
} = useNuxtApp()
const route = useRoute()
const W = route.params.w

// onMounted(() => {
//   console.log('ddd', $B.Web3)
//   console.log('www', W)
//   console.log('www', $B.Web3.utils.isAddress(W))
// })

// TODO: set storage by useStorage for wallet (rename) and whose

// if ($B.Web3.utils.isAddress(W)) {
//   localStorage.setItem('whose_param', W)
// }
// if (route.name !== 'read') {
//   await navigateTo({ path: '/' })
// }

</script>
