import { defineNuxtPlugin, useNuxtApp } from '#app'
import { External } from '~/libs/blockchain/classes'
import { getGlobalThis } from '@vue/shared'
import { useStorage } from '@vueuse/core'

export default defineNuxtPlugin(async () => {
    const state = useStorage(
        'connected-wallet',
        '',
        localStorage,
        { mergeDefaults: true },
    )

    const B = new External(useNuxtApp(), state)
    const glob = getGlobalThis()

    await B.init(glob)

    return {
        provide: {
            B,
        }
    }
})

/**
 * `Common` contains Config and CoreContract
 * Network extends Common
 * External extends Network
 */