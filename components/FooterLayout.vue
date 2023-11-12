<template lang="pug">
.fl
  .fl__top
    .fl__url dao-dream.com
    .fl__buttons.fl-buttons
      .fl-buttons__button.wb Channel
      .fl-buttons__button.wb Chat
      .fl-buttons__button.wb Discord
      .fl-buttons__button.wb Bot
  .fl__bottom
    .fl__copy © 2023 dao-dream.com. All rights reserved.
</template>


<script setup>

</script>

<style scoped lang="sass">
.fl
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

.fl-buttons
  display: flex
  color: #fff
  &__button
    margin-right: 8px
    padding: 14px
    font-size: 13px
</style>