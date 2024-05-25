<template lang="pug">
.general-stats-block
  .general-stats-block__header(v-if="isHasHeader") {{ header }}
  .general-stats-block__link(v-if="isHasLink")
    contract-address
  .general-stats-block__footer(v-if="isHasFooter") {{ footer }}
</template>

<script setup>
import ContractAddress from '~/components/ContractAddress.vue'
const props = defineProps({
  header: String,
  link: Boolean,
  footer: String,
})
const isHasHeader = ref(false)
const isHasLink = ref(false)
const isHasFooter = ref(false)

onMounted(() => {
  isHasHeader.value = !!props.header
  isHasLink.value = !!props.link
  isHasFooter.value = !!props.footer
})
</script>
