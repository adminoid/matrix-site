import {defineStore} from "pinia";

export const useWeb3Store = defineStore('web3_store', () => {
    const { $B } = useNuxtApp()
    // const connectedWallet = ref('')
    const checkConnected = async () => {
        // if mm is not installed
        if (!$B.Ethereum) {
            $B.Nuxt.$emit('disabled', {
                cause: 'Please install Metamask and reload the page 0',
                status: true,
            })
        }
        $B.Nuxt.$emit('update-whose')
    }

    const connectWallet = async () => {
        await $B.connect()
        await checkConnected()
    }

    const checkRegister = async () => {
        if ($B.Storage.value) {
            const resp = await $B.getCoreUser()
            if (resp) {
                return true
            }
        }
        return false
    }

    const getAddressesGlobalTotal = async () => {
        if ($B.Storage.value) {
            const resp = await $B.getAddressesGlobalTotal()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getWhoseOfUser = async () => {
        if ($B.Storage.value) {
            const resp = await $B.getWhoseOfUser()
            if (resp) {
                return resp
            }
            return false
        }
    }

    return {
        connectWallet,
        checkRegister,
        checkConnected,
        getAddressesGlobalTotal,
        getWhoseOfUser,
    }
})

// todo: when going to auth protected page - need to run authorization
