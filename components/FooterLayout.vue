<template lang="pug">
.footer-layout.container
  .footer-layout__top
    .footer-layout__url dao-dream.com
    .container
      .row.footer-layout__buttons.fl-buttons.d-flex.justify-between
        a(href="#").col.fl-buttons__button.wb.align-self-center.align-content-around Telegram channel
        .fl-buttons__spacer.col
        a(href="#").col.fl-buttons__button.wb.align-self-center.align-content-around Telegram chat
  .footer-layout__middle.row.d-flex
    .footer-layout__icon.footer-layout__icon_whatsapp.col
    .footer-layout__icon.footer-layout__icon_discord.col
    .footer-layout__icon.footer-layout__icon_twitter.col
    .footer-layout__icon.footer-layout__icon_facebook.col
    .footer-layout__icon.footer-layout__icon_ticktock.col
    .footer-layout__icon.footer-layout__icon_youtube.col
    .footer-layout__icon.footer-layout__icon_instagram.col
  .footer-layout__bottom
    .footer-layout__copy © 2023 dao-dream.com. All rights reserved.
</template>


<script setup>

</script>

<style scoped lang="sass">
.footer-layout
  &__url
    margin-bottom: 40px
  &__buttons
    margin-bottom: 40px
  &__bottom
    padding: 40px 80px
    border-top:  1px solid rgba(255, 255, 255, 0.2)
  &__copy
    font-size: 13px
    color: #BABCD2
  &__icon
    width: 20px
    height: 20px
    background-repeat: no-repeat
    background-position: 50%
    margin-bottom: 24px
    &_whatsapp
      background-image: url('@/assets/img/icons/whatsapp.svg')
    &_discord
      background-image: url('@/assets/img/icons/discord.svg')
    &_twitter
      background-image: url('@/assets/img/icons/twitter.svg')
    &_facebook
      background-image: url('@/assets/img/icons/facebook.svg')
    &_ticktock
      background-image: url('@/assets/img/icons/ticktock.svg')
    &_youtube
      background-image: url('@/assets/img/icons/youtube.svg')
    &_instagram
      background-image: url('@/assets/img/icons/instagram.svg')
.fl-buttons
  display: flex
  &__button
    text-decoration: none
    color: #fff
    font-size: 13px
    background: url("@/assets/img/icons/tg.svg") 9px 50% no-repeat
    padding: 10px 32px
  &__spacer
    max-width: 10px
</style>
