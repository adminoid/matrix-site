<template lang="pug">
#modal-alert.modal.position-fixed.d-block.bg-body-secondary.p-4.py-md-5(
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
        h1.modal-title.fs-5.text-success(v-if="modalTitle === 'Success'") {{ modalTitle }}
        h1.modal-title.fs-5.text-danger(v-else) {{ modalTitle }}
        button.btn-close(
          type='button'
          data-bs-dismiss='modal'
          aria-label='Close'
          @click="closeModal"
        )
      .modal-body.py-0
        p.text-center.text-success(v-if="modalTitle === 'Success'")
          | {{ localAlertPropCopy.message }}
        p.text-center.text-danger(v-else)
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
import {computed} from "vue";

const props = defineProps({
  alert: {
    type: Object,
    default: {},
  },
})

const modalTitle = computed(() => {
  return props.alert.type === 'danger' ? 'Error' : 'Success'
})

const localAlertPropCopy = ref({})

onMounted(()=>{
  localAlertPropCopy.value = props.alert
})
const showModal = ref(true)

watchEffect(() => {
  showModal.value = (props.alert.type && props.alert.message)
  localAlertPropCopy.value = props.alert
})

const closeModal = () => {
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