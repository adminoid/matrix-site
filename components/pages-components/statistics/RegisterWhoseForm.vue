<template lang="pug">
hr
.row.frame.frame_no-top
  .mb-3.row
    .col.col-sm-3.mb-3
      label.col-form-label(for='register-whose') Register whose
      .input-group
        a.btn.btn-danger.btn-sm(
          tabindex="-1"
          role="button"
          aria-disabled="true"
        ) clear
    .col-sm-9.mb-3
      .input-group
        input#register-whose.form-control.col-4(
          type='text'
          required
        )
  .row
    button(
      type="button"
      class="btn btn-outline-success"
    ) Register
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
