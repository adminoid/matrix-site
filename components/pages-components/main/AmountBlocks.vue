<template lang="pug">
.general-stats
  .row.row-cols-1.row-cols-md-3
    .col
      main-banner(
        header="Amount of BNB received from id1 to help animals"
        link=true
        footer="0.034"
      )
    .col
      main-banner(
        header="Amount of BNB received from donation to help animals"
        link=true
        footer="0.034"
      )
    .col
      main-banner(
        header="Amount of BNB sent to help animals"
        :columns="[{ amount: 0.034, title: 'From a wallet id1'}, { amount: 0.034, title: 'From a wallet for donation'}]"
      )
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
</script>