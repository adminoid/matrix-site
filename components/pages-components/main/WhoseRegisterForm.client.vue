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
import {GetEvents} from "~/libs/events/abi-events.js";
import {isClient} from "@vueuse/core";

const disabled = useDisabled()
const BC = await getBC()
const whoseAddress = ref('')
const error = ref('')

onMounted(async () => {
  const whoseInit = localStorage.getItem('whose-param')
  await validateValue(whoseInit)
  whoseAddress.value = whoseInit
})

watch(whoseAddress, async (newValue) => {
  await validateValue(newValue)
})

const validateValue = async (value) => {
  if (BC.hasOwnProperty('value') && !!value) {
    if (!BC.value.Web3MM.utils.isAddress(value)) {
      error.value = 'please enter valid ethereum address'
    } else if (value.toLowerCase() === BC.value.Wallet.toLowerCase()) {
      error.value = 'Is not possible to be whose to yourself'
    }
  }
  else {
    error.value = ''
  }
}

const registerWhose = async () => {
  await validateValue(whoseAddress.value)
  if (!error.value) {

    if (!whoseAddress.value) {
      const cnf = useRuntimeConfig()
      whoseAddress.value = cnf.public.ID_ADDRESS_0
    }

    await BC.value.registerWhose(whoseAddress.value)
  }
}

const clearWhose = async () => {
  localStorage.removeItem('whose-param')
  whoseAddress.value = ''

  // https://docs.infura.io/api/networks/ethereum/json-rpc-methods/eth_getlogs
  // https://www.infura.io/blog/post/ethereum-rpcs-methods

  // todo => restore mark

  // console.info('SHA')
  // console.warn(BC.value.Web3MM.utils.sha3('WhoseRegistered(address,address,uint)'))
  // console.warn(Web3.utils.sha3(''))

  // TODO: move this stuff to Referrals.vue
  if (isClient) {
    const r1 = await GetEvents('GiftAppear')
    console.log(r1)
  }

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
