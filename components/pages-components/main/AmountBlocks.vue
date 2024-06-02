<template lang="pug">
.general-stats
  main-banner(
    header="Registered accounts"
    footer="24"
  )
  main-banner(
    header="Amount of BNB entered to the system"
    link=true
    footer="0.034"
  )
  main-banner(
    header="BTC equivalent of sent BNB that entered to the system"
    footer="0.034"
  )
  main-banner(
    header="Amount of BNB sent to farming and staking"
    footer="0.034"
  )
  main-banner(
    header="Amount of BTCB profit from farming and staking"
    footer="0.034"
  )
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
</script>