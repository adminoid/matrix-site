<template lang="pug">
main-intro.main-block
personal-account.main-block
referrals.main-block
my-rewards.main-block
registered-table.main-block
general-stats.main-block
registered-global-table.main-block
</template>

<script setup>
import MainIntro from '~/components/pages-components/main/MainIntro.vue'
import PersonalAccount from '~/components/pages-components/main/PersonalAccount.vue'
import Referrals from '~/components/pages-components/main/Referrals.vue'
import MyRewards from '~/components/pages-components/main/MyRewards.vue'
import RegisteredTable from '~/components/pages-components/main/RegisteredTable.vue'
import GeneralStats from '~/components/pages-components/main/GeneralStats.vue'
import RegisteredGlobalTable from '~/components/pages-components/main/RegisteredGlobalTable.vue'

const { $B } = useNuxtApp()
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

<style lang="sass">
.main-block
  margin-bottom: 1.5rem
</style>