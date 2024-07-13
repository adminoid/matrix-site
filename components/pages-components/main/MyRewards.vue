<template lang="pug">
.my-rewards.row.row-cols-1.row-cols-md-2
  .col
    .my-rewards__header My rewards
    .my-rewards__table
      my-rewards-referrals
      .row.mb-2
        .col-10 Amount of BNB received to the wallet
        .col-2.text-end 42
      .row.mb-2
        .col-10 Amount of BNB received to the withdrawal (Matrices)
        .col-2.text-end 42
      .row.mb-2
        .col-10 Amount of BNB received to the withdrawal (Referral)
        .col-2.text-end 42
      .row.mb-2
        .col-10 Amount of BNB debited from withdrawal
        .col-2.text-end 42
  .col
    .my-rewards__form.mt-3.mt-md-0
      .row.mb-2
        .col-10.mb-3 Account balance
        .col-2.text-end 42
        br
        form
          label.form-label(for="rewards") Rewards
          input.form-control.mb-4(name="rewards" id="rewards")
          .row
            .col
              button.btn.btn-outline-light.personal-account__button.w-100 Claim BNB
</template>

<script setup>
import MyRewardsReferrals from '~/components/pages-components/main/MyRewardsReferrals.vue'
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
  &__form
    background-color: #1C1A2E
    padding: 10px
    border-radius: .5rem
</style>