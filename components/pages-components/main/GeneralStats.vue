<template lang="pug">
.general-stats.container
  .row.row-cols-1.row-cols-md-3
    .col.col-md-3
      main-banner(
        header="Registered accounts"
        footer="24"
      )
    .col.col-md-6
      main-banner(
        header="Amount of BNB entered to the system"
        link=true
        footer="0.034"
      )
    .col.col-md-3
      main-banner(
        header="BTC equivalent of sent BNB that entered to the system"
        footer="0.034"
      )
  .row.row-cols-1.row-cols-md-2
    .col
      main-banner(
        header="Amount of BNB sent to farming and staking"
        footer="0.034"
      )
    .col
      main-banner(
        header="Amount of BTCB profit from farming and staking"
        footer="0.034"
      )
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
</script>