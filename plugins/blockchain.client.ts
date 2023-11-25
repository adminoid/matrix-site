import { defineNuxtPlugin, useNuxtApp } from '#app'
import { External } from '~/libs/blockchain/classes'
import { getGlobalThis } from '@vue/shared'

export default defineNuxtPlugin(async () => {
    const B = new External(useNuxtApp())
    // await B.init()
    // console.log(B.init())
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