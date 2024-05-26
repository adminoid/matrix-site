<template lang="pug">
.contract-address
  span.contract-address__ellipsis 0x4D7fc3A131B9530996593e098EAAC5f43a7179A1
  span.contract-address__indent(ref="refAddress") {{ rightAddress }}
  a.contract-address__link(href="https://bscscan.com/address/0x4D7fc3A131B9530996593e098EAAC5f43a7179A1" target="_blank")
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
.contract-address
  display: flex
  width: 90%
  > span
    display: block
    white-space: nowrap
    overflow: hidden
    margin-right: -0.24rem
  &__ellipsis
    display: inline-block
    width: 50%
    text-overflow: ellipsis
  &__indent
    width: 50%
  &__link
    background-image: url("@/assets/img/icons/link-external.svg")
    background-repeat: no-repeat
    background-position: 50%
    width: 22px
    height: 27px
</style>
