<template lang="pug">
.donation-block
  .donation-block__header Donation
  .donation-block__description.text-center You can donate any amount of tokens and stablecoins (ERC20, BEP20) without limits to help
  img.donation-block__qr-key.img-fluid.mx-auto.d-block(src="@/assets/img/qr-temp.jpg")
  .donation-block__wallet.d-flex.align-content-between
    .donation-block__wallet--addr-text.flex-grow-1.ms-3 0xEc325f1c166F2fe56Cd9A26e1a48afD1e4E70BE7
    a(href="#").d-block.donation-block__wallet--copy-icon
</template>

<style lang="sass">
.donation-block
  border-radius: 16px
  border: 1px solid #393849
  display: flex
  flex-direction: column
  align-items: center
  padding: 24px
  background: radial-gradient(97.9% 46.65% at 50% 108.23%, rgba(255, 255, 255, 0.9) 0%, rgba(113, 61, 255, 0.9) 33.33%, rgba(0, 0, 0, 0) 100%), rgba(255, 255, 255, 0.02)
  &__header
    font-size: 18px
    font-weight: 400
    line-height: 24px
    text-align: center
    margin-bottom: 12px
  &__description
    font-size: 13px
    font-weight: 400
    line-height: 18px
    color: #BABCD2
    margin-bottom: 24px
  &__qr-key
    max-width: 129px
    margin-bottom: 24px
  &__wallet
    &--addr-text
      word-break: break-all
      font-size: 16px
      font-weight: 400
      line-height: 24px
    &--copy-icon
      background-image: url("@/assets/img/icons/copy-big.svg")
      background-repeat: no-repeat
      min-width: 17px
      min-height: 20px
      margin-left: 12px
</style>