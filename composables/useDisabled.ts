import { useNuxtApp } from "#app"
import { nextTick } from 'vue'

export function useDisabled() {
  // state encapsulated and managed by the composable
  let disabled = ref({ cause: '', status: false})

  // composable can update its managed state over time.
  async function update(disableObject: any) {
    await nextTick(() => {
      disabled.value = disableObject
    })
  }

  // @ts-ignore
  useNuxtApp().$on('disabled', async (disabledObj: any) => {
    await update(disabledObj)
  })

  return disabled
}