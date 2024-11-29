<template lang="pug">
.register-whose.p-0
  form.p-0
    .register-whose__frame
      .register-whose__form
        .register-whose__amount.pb-3
          label.form-label(for="send-amount") Patreon address
          .input-group
            input.form-control(
              type='text'
              :class="{'is-invalid': !!error}"
              v-model="whoseAddress"
              :disabled="disabled.status"
              name="send-amount"
              id="send-amount"
              required
            )
            a.btn.btn-danger.btn-sm(
              tabindex="-1"
              role="button"
              aria-disabled="true"
              @click="clearWhose"
            ) clear
            .invalid-feedback.mb-3 {{ error }}
        .row
          .col
            button.btn.btn-outline-light.register-whose__button.w-100(
              type="button"
              class="btn btn-outline-primary"
              @click="registerWhose"
              :disabled="disabled.status"
            ) Register
</template>

<script lang="js" setup>
import { ref, watch } from 'vue'
import { useDisabled } from '~/composables/useDisabled'
import {isClient} from "@vueuse/core";

let BC

const whoseAddress = ref('')
onMounted(async () => {
  const whoseInit = localStorage.getItem('whose-param')
  await validateValue(whoseInit)
  whoseAddress.value = whoseInit
})

watch(whoseAddress, async (newValue) => {
  await validateValue(newValue)
})

const disabled = useDisabled()
const error = ref('')
const validateValue = async (value) => {
  if (!isClient) return
  BC = getBC()
  if (BC && BC.value) {
    if (!BC.value.Web3MM.utils.isAddress(value)) {
      error.value = 'please enter valid ethereum address'
    } else if (value.toLowerCase() === BC.value.Wallet.toLowerCase()) {
      error.value = 'Is not possible to be whose to yourself'
    } else {
      error.value = ''
    }
  }
}

const { $on } = useNuxtApp()
$on('alert', ({type, message, clarification}) => {
  if (clarification === 'registerWhose' && type === 'danger') error.value = message
})

const registerWhose = async () => {
  await validateValue(whoseAddress.value)
  if (!isClient) return
  if (!error.value) {
    if (!whoseAddress.value) {
      const cnf = useRuntimeConfig()
      whoseAddress.value = cnf.public.ID_ADDRESS_0
    }
    BC = getBC()
    if (BC && BC.value) {
      await BC.value.registerWhose(whoseAddress.value)
    }
  }
}

const clearWhose = async () => {
  localStorage.removeItem('whose-param')
  whoseAddress.value = ''
}
</script>

<style lang="sass">
.register-whose
  &__frame
    padding: 16px
    border-radius: 1rem
    border: 1px solid #FFFFFF33
  &__form
    .form-label
      color: #7B859F
</style>
