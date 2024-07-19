<template lang="pug">
form
  label.form-label(for="rewards") Claim amount
  input.form-control(
    name="rewards"
    id="rewards"
    v-model="amountValue"
    :class="{'is-invalid': !!error}"
  )
  .invalid-feedback {{ error }}
  .row
    .col
      button.personal-account__button(
        class="btn btn-outline-light w-100 mt-4"
        @click.prevent="withdrawClaim"
        :disabled="disabled.status"
      )
        | Claim BNB
</template>

<script setup>
const amountValue = ref(0)
const error = ref('')

const disabled = useDisabled()
const { $B } = useNuxtApp()

watch(amountValue, async (newValue) => {
  await validateValue(newValue)
})

const validateValue = async (value) => {

  // console.warn(value)

  const accounts = await $B.Web3.eth.getAccounts();
  if (!accounts || !$B.Wallet) {
    error.value = 'Please connect your wallet first'
  } else {
    const valueStr = String(value)
    if (valueStr.includes(',')) {
      value = valueStr.replace(/,/g, '.')
      amountValue.value = value
    }
    // if (
    //     valueStr !== '0'
    //     && valueStr.startsWith('0')
    //     && (valueStr[1] !== '.' || valueStr[1] !== ',')
    // ) {
    //   while (valueStr.startsWith(0)) {
    //     value = valueStr.replace(/^0/g, '')
    //   }
    //   amountValue.value = value
    // }
    if (isNaN(Number(value))) {
      error.value = 'please enter a valid number'
    } else if (Number(value) <= 0) {
      error.value = 'please enter a number > 0'
    } else {
      error.value = ''
    }
  }
}

const withdrawClaim = async () => {
  await validateValue(amountValue.value)
  if (!error.value) {
    await $B.withdrawClaim(String(amountValue.value))
  }
}
</script>
