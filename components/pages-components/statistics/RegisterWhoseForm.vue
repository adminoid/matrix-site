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
          @click="clearWhose"
        ) clear
    .col-sm-9.mb-3
      .input-group
        input#register-whose.form-control.col-4(
          type='text'
          required
        )
        .invalid-feedback {{ error }}
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
onMounted(async () => {
  if (!$B.Ethereum) {
    storage.value = ''
  }
})

const registerWhoseAddr = ref('')
const error = ref('')
const validateValue = async (value) => {
  const accounts = await $B.Web3.eth.getAccounts();
  if (!accounts || !$B.Wallet) {
    error.value = 'Please connect your wallet first'
  } else {
    if (!$B.Web3.utils.isAddress(value)) {
      error.value = 'please enter valid ethereum address'
    } else if (value.toLowerCase() === $B.Wallet.toLowerCase()) {
      error.value = 'Is not possible to be whose to yourself'
    } else {
      error.value = ''
    }
  }
}
watch(registerWhoseAddr, async (newValue) => {
  await validateValue(newValue)
})
const clearWhose = () => {
  localStorage.removeItem('whose_param')
  registerWhoseAddr.value = ''
}
</script>
