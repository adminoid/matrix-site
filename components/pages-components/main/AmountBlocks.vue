<template lang="pug">
.general-stats
  .row.row-cols-1.row-cols-md-3
    .col
      amount-blocks-id1
    .col
      main-banner(
        header="Amount of BNB received from donation to help animals"
        link=true
        footer="0.000"
        :isShowed="true"
      )
    .col
      main-banner(
        header="Amount of BNB sent to help animals"
        :footer="false"
        :columns="[{ amount: '0.000', title: 'From a wallet id1'}, { amount: '0.000', title: 'From a wallet for donation'}]"
        :isShowed="true"
      )
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import AmountBlocksId1 from "~/components/pages-components/main/AmountBlocksId1.vue";
</script>