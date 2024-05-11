<template lang="pug">
.personal-account.mt-5
  h5.personal-account__header Personal account
  form
    .personal-account__frame
      .personal-account__form
        .pb-3
          label.form-label(for="contract") Smart-contract
          .personal-account__contract(id="contract")
            .personal-account__contract-address
              | <span class="personal-account__contract-elipsis">0x4D7fc3A131B9530996593e098EAAC5f43a7179A1</span><span class="personal-account__contract-indent" ref="refAddress">{{ rightAddress }}</span>
            .personal-account__contract-link
            .personal-account__contract-copy
        .personal-account__amount.pb-3
          label.form-label(for="amount") Send amount
          input.form-control(name="amount" id="amount")
        .row
          .col
            button.btn.btn-outline-light.personal-account__button.w-100 Contribution
</template>

<script setup>
import {useResizeObserver} from '@vueuse/core'

const rightAddress = ref("")

const refAddress = ref(null)
useResizeObserver(refAddress, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  rightAddress.value = getSymbolsByWidth("0x4D7fc3A131B9530996593e098EAAC5f43a7179A1", width)
})

onMounted(() => {
  rightAddress.value = getSymbolsByWidth("0x4D7fc3A131B9530996593e098EAAC5f43a7179A1", 50)
})

const getSymbolsByWidth = (inputString, maxWidth) => {
  const text = inputString.split("").reverse()
  let resultString = "", actualWidth = 0
  for (let i = 0; i < text.length; i++) {
    resultString += text[i]
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext('2d')
    ctx.font = "400 16px Inter";
    const textResultProps = ctx.measureText(resultString)
    if (actualWidth >= maxWidth) break
    actualWidth = textResultProps.width
  }
  return resultString.split("").slice(0, -2).reverse().join("")
}

</script>

<style lang="sass">
.personal-account
  &__header
    text-align: center
    font-weight: 400
    margin-bottom: 24px
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
    > span
      white-space: nowrap
      overflow: hidden
      vertical-align: middle
    &-link
      background-image: url("@/assets/img/icons/link-external.svg")
      background-repeat: no-repeat
      background-position: 50%
      width: 22px
      height: 27px
    &-copy
      background-image: url("@/assets/img/icons/copy.svg")
      background-repeat: no-repeat
      width: 22px
      height: 27px
      background-position: 50%
    &-address
      width: 90%
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
