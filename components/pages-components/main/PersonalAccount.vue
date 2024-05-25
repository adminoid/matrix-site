<template lang="pug">
.personal-account.mt-5
  h5.centered-header Personal account
  form
    .personal-account__frame
      .personal-account__form
        .pb-3
          label.form-label(for="contract") Smart-contract
          .personal-account__contract(id="contract")
            contract-address
            .personal-account__contract-copy
        .personal-account__amount.pb-3
          label.form-label(for="amount") Send amount
          input.form-control(name="amount" id="amount")
        .row
          .col
            button.btn.btn-outline-light.personal-account__button.w-100 Contribution
</template>

<script setup>
import ContractAddress from '~/components/ContractAddress.vue'
</script>

<style lang="sass">
.personal-account
  &__frame
    padding: 16px
    border-radius: 1rem
    border: 1px solid #FFFFFF33
  &__form
    .form-label
      color: #7B859F
  &__contract
    background-color: #1C1A2E
    border-radius: 0.5rem
    white-space: nowrap
    display: flex
    padding: 10px
    justify-content: space-between
    &-copy
      background-image: url("@/assets/img/icons/copy.svg")
      background-repeat: no-repeat
      width: 22px
      height: 27px
      background-position: 50%
</style>
