<template lang="pug">
.personal-account.ps-0
  form
    .personal-account__frame
      .personal-account__form
        .pb-3
          label.form-label(for="contract") Smart-contract
          .personal-account__contract(id="contract")
            contract-address
            .personal-account__contract-copy
        .personal-account__amount.pb-3
          label.form-label(for="send-amount") Send amount
          input.form-control(
            type='text'
            :class="{'is-invalid': !!error}"
            v-model="amountValue"
            :disabled="disabled.status"
            name="send-amount"
            id="send-amount"
            required
          )
          .invalid-feedback {{ error }}
        .row
          .col
            button.btn.btn-outline-light.personal-account__button.w-100(
              type="button"
              class="btn btn-outline-primary"
              @click="sendAmount"
              :disabled="disabled.status"
            ) Contribution
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useDisabled } from '~/composables/useDisabled'
import ContractAddress from '~/components/ContractAddress.vue'
import {isClient} from "@vueuse/core"

let BC

const disabled = useDisabled()
const amountValue = ref('0')
const error = ref('')

watch(amountValue, async (newValue) => {
  await validateValue(newValue)
})

const validateValue = async (value: any) => {
  if (!isClient) return
  BC = getBC()
  if (BC && BC.value) {
    // @ts-ignore
    const accounts = await BC.value.Web3MM.eth.getAccounts();
    // @ts-ignore
    if (!accounts || !BC.value.Wallet) {
      error.value = 'Please connect your wallet first'
    } else {
      if (String(value).includes(',')) {
        value = String(value).replace(/,/g, '.')
        amountValue.value = value
      }
      if (isNaN(Number(value))) {
        error.value = 'please enter a valid number'
      } else if (Number(value) <= 0) {
        error.value = 'please enter a number > 0'
      } else {
        error.value = ''
      }
    }
  }
}

const { $on } = useNuxtApp()
$on('alert', ({type, message, clarification}) => {
  if (clarification === 'sendAmount' && type === 'danger') error.value = message
})

const sendAmount = async () => {
  await validateValue(amountValue.value)
  if (!error.value) {
    if (!isClient) return
    BC = getBC()
    if (BC && BC.value) {
      // @ts-ignore
      await BC.value.sendAmount(String(amountValue.value))
    }
  }
}
</script>

<style lang="sass">
.personal-account
  &__frame
    padding: 16px
    border-radius: 1rem
    border: 1px solid #FFFFFF33
  &__form
    .form-label
      color: #7B859F
  &__contract
    background-color: #1C1A2E
    border-radius: 0.5rem
    white-space: nowrap
    display: flex
    padding: 10px
    justify-content: space-between
    &-copy
      background-image: url("@/assets/img/icons/copy.svg")
      background-repeat: no-repeat
      width: 22px
      height: 27px
      background-position: 50%
</style>
