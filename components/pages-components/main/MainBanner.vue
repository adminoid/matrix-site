<template lang="pug">
.main-banner
  .main-banner__header(v-if="isHasHeader") {{ header }}
  .main-banner__link(v-if="isHasLink")
    contract-address
  .main-banner__footer(v-if="isShowed && isHasFooter") {{ footer }}
  .main-banner__columns(v-if="isShowed && isHasColumns")
    .row
      .col.px-4.d-flex.justify-content-between.flex-column(v-for="col in columns")
        .main-banner__columns-title.row {{ col.title }}
        .main-banner__columns-amount.row {{ col.amount }}
  .main-banner__columns <i>Is loading...</i>
</template>

<script setup>
import ContractAddress from '~/components/ContractAddress.vue'
const props = defineProps({
  isShowed: Boolean,
  header: String,
  link: Boolean,
  footer: Number | String,
  columns: {
    type: Array,
    required: false,
  },
})
const isHasHeader = ref(false)
const isHasLink = ref(false)
const isHasFooter = ref(false)
const isHasColumns = ref(false)

onMounted(() => {
  isHasHeader.value = !!props.header
  isHasLink.value = !!props.link
  isHasFooter.value = !!props.footer
  isHasColumns.value = !!props.columns && props.columns.length > 1
})
</script>

<style lang="sass">
.main-banner
  border: 1px solid #353445
  border-radius: 1rem
  margin-bottom: 1rem
  padding: 1rem
  background: radial-gradient(137.3% 199.64% at 50% 133.1%, rgba(255, 255, 255, 0.4) 0%, rgba(113, 61, 255, 0.4) 32.82%, rgba(0, 0, 0, 0) 78.46%)
  &__header
    font-size: 1rem
    font-weight: 400
    line-height: 24px
    margin-bottom: 0.5rem
    color: #BABCD0
  &__link
    font-size: 13px
    font-weight: 400
    line-height: 18px
  &__footer, &__columns-amount
    color: #fff
    font-size: 24px
    font-weight: 400
    line-height: 32px
    letter-spacing: -0.02em
  &__columns-title
    font-size: 13px
    font-weight: 400
    line-height: 18px
</style>