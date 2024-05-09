<template lang="pug">
.personal-account.mt-5
  h5.personal-account__header Personal account
  form
    .personal-account__frame
      .personal-account__form
        .pb-3
          label.form-label(for="contract") Smart-contract
          .personal-account__contract(id="contract")
            .personal-account__contract-address <span class="personal-account__contract-elipsis">0xEQCVy5bE0000000000000002c5EQCVy5bE0000000000000002c5</span><span class="personal-account__contract-indent">0xEQCVy5bE0000000000000002c5EQCVy5bE0000000000000002c5</span>
            .personal-account__contract-link
        .personal-account__amount.pb-3
          label.form-label(for="amount") Send amount
          input.form-control(name="amount" id="amount")
        button.btn.btn-outline-light.personal-account__button Contribution
</template>

<style lang="sass">
.personal-account
  &__header
    text-align: center
    font-weight: 400
  &__frame
    padding: 16px
    border-radius: 1rem
    border: 1px solid #FFFFFF33
  &__form
    .form-label
      color: #7B859F
  &__contract
    border: 1px solid red
    white-space: nowrap
    display: flex
    padding: 10px
    > span
      white-space: nowrap
      overflow: hidden
      vertical-align: middle
    &-link
      background-image: url("~/assets/img/icons/link-external.svg")
      background-repeat: no-repeat
      width: 22px
      height: 27px
    &-address
      width: 90%
      border: 1px solid green
      white-space: nowrap
      > span
        white-space: nowrap
        overflow: hidden
        vertical-align: middle
    &-elipsis
      display: inline-block
      width: calc(50% + 1.2em)
      text-overflow: ellipsis
    &-indent
      display: inline-flex
      width: calc(50% - 1.2em)
      justify-content: flex-end
</style>
