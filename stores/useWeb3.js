import {defineStore} from "pinia";
import {getGlobalThis} from "@vue/shared";

export const useWeb3Store = defineStore('web3_store', () => {
    const { $B } = useNuxtApp()
    const connectedWallet = ref('')
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
        const glob = getGlobalThis()
        await $B.init(glob)
        await $B.connect()
        await checkConnected()
        connectedWallet.value = $B.Wallet

        $B.Ethereum.on('accountsChanged', (accounts) => {
            connectedWallet.value = accounts[0]
        })
    }
    return {connectedWallet, connectWallet}
})