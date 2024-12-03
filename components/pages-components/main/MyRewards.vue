<template lang="pug">
.my-rewards.row.row-cols-1.row-cols-md-2
  .col
    .my-rewards__header My rewards
    .my-rewards__table
      my-rewards-referrals
      my-rewards-below-two
      my-rewards-claims
      my-rewards-claims-referrals
      my-rewards-withdrawals
      my-rewards-write-off-auto
  .col
    my-rewards-claim-form
</template>

<script setup>
import MyRewardsReferrals from '~/components/pages-components/main/MyRewardsReferrals.client.vue'
import MyRewardsClaims from '~/components/pages-components/main/MyRewardsClaims.vue'
import MyRewardsBelowTwo from "~/components/pages-components/main/MyRewardsBelowTwo.vue";
import MyRewardsClaimsReferrals from "~/components/pages-components/main/MyRewardsClaimsReferrals.vue";
import MyRewardsClaimForm from "~/components/pages-components/main/MyRewardsClaimForm.vue";
import MyRewardsWithdrawals from "~/components/pages-components/main/MyRewardsWithdrawals.vue";
import MyRewardsWriteOffAuto from "~/components/pages-components/main/MyRewardsWriteOffAuto.vue";
</script>

<style lang="sass">
.my-rewards
  background-color: #08061C
  border-radius: 1rem
  padding: 1rem
  border: 1px solid #393849
  font-size: 13px
  font-weight: 400
  line-height: 18px
  color: #7B859F
  &__header
    font-size: 1rem
    font-weight: 500
    line-height: 24px
    margin-bottom: 24px
    color: white
</style>