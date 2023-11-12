import { defineNuxtPlugin } from '#app'
import mitt from 'mitt'
const emitter = mitt()

export default defineNuxtPlugin(() => {
    return {
        provide: {
            on: emitter.on,
            emit: emitter.emit,
        }
    }
})
