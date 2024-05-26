<template lang="pug">
.general-stats
  h5.centered-header General statistics
  general-stats-block(
    header="Registered accounts"
    footer="24"
  )
  general-stats-block(
    header="Amount of BNB entered to the system"
    link=true
    footer="0.034"
  )
  general-stats-block(
    header="BTC equivalent of sent BNB that entered to the system"
    footer="0.034"
  )
  general-stats-block(
    header="Amount of BNB sent to farming and staking"
    footer="0.034"
  )
  general-stats-block(
    header="Amount of BTCB profit from farming and staking"
    footer="0.034"
  )
</template>

<script setup>
import GeneralStatsBlock from '~/components/pages-components/main/GeneralStatsBlock.vue'
</script>