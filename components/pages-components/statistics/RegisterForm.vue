<template lang="pug">
hr
.row.frame
  .mb-3.row
    .fst-italic Same as just send bnb from wallet to contract address
  .mb-3.row
    .col.col-sm-3.mb-3
      label.col-form-label(for='send-amount') Send amount
    .col-sm-9.mb-3
      .input-group
        input#send-amount.form-control.col-4(
          type='text'
          required
        )
  .row
    button(
      type="button"
      class="btn btn-outline-primary"
    ) Send
</template>

<script setup>
import { useStorage } from '@vueuse/core'
const { $B } = useNuxtApp()
const storage = useStorage("connected-wallet", "")
onMounted(() => {
  if (!$B.Ethereum) {
    storage.value = ''
  }
})
</script>
