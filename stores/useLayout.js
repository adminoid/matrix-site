import {defineStore} from "pinia";
import {
    breakpointsBootstrapV5,
    useBreakpoints,
} from '@vueuse/core'

export const useLayoutStore = defineStore('counter', () => {
    const isOpenedSidebar = ref(false)
    const breakpoints = useBreakpoints(breakpointsBootstrapV5)
    const toggleSidebar = () => {
        const less = ref(breakpoints.isSmallerOrEqual('lg'))
        if (less.value) {
            isOpenedSidebar.value = !isOpenedSidebar.value
        } else {
            isOpenedSidebar.value = false
        }
    }

    return {isOpenedSidebar, toggleSidebar}
})