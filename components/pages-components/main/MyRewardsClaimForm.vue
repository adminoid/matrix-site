<template lang="pug">
client-only
  .my-rewards-claim-form.mt-3.mt-md-0
    .row.mb-2
      my-rewards-claim-form-balance
      my-rewards-claim-form-form
</template>

<script setup>
import MyRewardsClaimFormBalance from "~/components/pages-components/main/MyRewardsClaimFormBalance.vue";
import MyRewardsClaimFormForm from "~/components/pages-components/main/MyRewardsClaimFormForm.vue";
</script>

<style lang="sass">
.my-rewards-claim-form
  background-color: #1C1A2E
  padding: 10px
  border-radius: .5rem
</style>