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

    const checkRegister = (wallet) => {
        const resp = $B.getCoreUser(wallet)
        console.log(resp)
    }

    return {
        connectWallet,
        checkRegister,
        checkConnected,
    }
})

// todo: when going to auth protected page - need to run authorization
