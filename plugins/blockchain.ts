import { defineNuxtPlugin, useNuxtApp } from '#app'
import { External } from '~/libs/blockchain/classes'
import { getGlobalThis } from '@vue/shared'

export default defineNuxtPlugin(async () => {
    const Blockchain = new External(useNuxtApp(), getGlobalThis())
    return {
        provide: {
            Blockchain,
        }
    }
})
