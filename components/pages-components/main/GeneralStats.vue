<template lang="pug">
.general-stats.container
  .row.row-cols-1.row-cols-md-3
    .col.col-md-3
      general-stats-accounts
    general-stats-transfers
  .row.row-cols-1.row-cols-md-2
    .col
      general-stats-farming
    .col
      main-banner(
        header="Amount of BTCB profit from farming and staking"
        footer="0.000"
        :isShowed="true"
      )
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import GeneralStatsAccounts from '~/components/pages-components/main/GeneralStatsAccounts.vue'
import GeneralStatsTransfers from '~/components/pages-components/main/GeneralStatsTransfers.client.vue'
import GeneralStatsFarming from '~/components/pages-components/main/GeneralStatsFarming.vue'
</script>