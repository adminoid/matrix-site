<template lang="pug">
#modal-alert.modal.position-absolute.d-block.bg-body-secondary.p-4.py-md-5(
  tabindex='-1'
  role='dialog'
  v-if="showModal"
)
  .modal-dialog(
    role='document'
    v-on-click-outside="closeModal"
  )
    .modal-content.rounded-4.shadow
      .modal-header.border-bottom-0
        //h1.modal-title.fs-5 Modal title
        button.btn-close(
          type='button'
          data-bs-dismiss='modal'
          aria-label='Close'
          @click="closeModal"
        )
      .modal-body.py-0
        p.text-center
          | {{ localAlertPropCopy.message }}
      .modal-footer.flex-column.align-items-stretch.w-100.gap-2.pb-3.border-top-0
        button.btn.btn-lg.btn-secondary(
          type='button'
          data-bs-dismiss='modal'
          @click="closeModal"
        ) Close
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
  alert: {
    type: Object,
    default: {},
  },
})

const localAlertPropCopy = ref({})

onMounted(()=>{
  localAlertPropCopy.value = props.alert
})
const showModal = ref(true)

watchEffect(() => {

  console.log('watchEffect watchEffect watchEffect')

  showModal.value = (props.alert.type && props.alert.message)
  const alertCopy = props.alert

  console.info('alertCopy:', alertCopy)
  console.info('alertCopy.message:', alertCopy.message)

  // const test = alertCopy.message.indexOf('this.Ethereum is undefined')
  // console.log(test)
  // if (test > -1) {
  //   console.log(alertCopy)
  //   alertCopy.message = 'Please connect Metamask'
  // }

  localAlertPropCopy.value = alertCopy
})

const closeModal = () => {
  console.info('closeModal.-s4')
  localAlertPropCopy.alert = {
    type: '',
    message: '',
  }
  showModal.value = false
}
</script>

<style lang="sass">
#modal-alert
  background: rgba(102, 0, 136, 0.2) !important
</style>