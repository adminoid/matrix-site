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
import Web3 from 'web3'

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

const clearWhose = () => {
  localStorage.removeItem('whose-param')
  whoseAddress.value = ''

  // https://docs.infura.io/api/networks/ethereum/json-rpc-methods/eth_getlogs
  // https://www.infura.io/blog/post/ethereum-rpcs-methods

  // todo => restore mark

  console.warn(Web3.utils.sha3('ReferralEarn(address,uint,address)'))
  // DirectTransfer(address,uint) 0xc6398e1bde585d1973c9edda3b218d746ed1b543b16b0cc0857a8b079cd8cc1c
  // WhoseRegistered(address,address,uint) 0x1333050ac156b5c3886709073d1ccdc3f5cd6a330b397ff13c244ec98707b97a
  // ReferralEarn(address,uint,address) 0x5976cd6bfffc8c9c8f4d388f817bbe1c30e48adf9f3d36cf9bc2444321063def
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
