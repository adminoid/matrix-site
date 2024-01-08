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

    const coreUser = ref({})
    const checkRegister = async () => {
        if ($B.Wallet.value) {
            coreUser.value = await $B.getUserFromCore()
            if (coreUser.value) {
                return true
            }
        }
        return false
    }

    const getAddressesGlobalTotal = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getAddressesGlobalTotal()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getWhoseOfUser = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getWhoseOfUser()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getReferralEarn = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getReferralEarn()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getGiftsAccrued = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getGiftsAccrued()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getGiftsSpent = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getGiftsSpent()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getDescendants = async () => {
        // getUserFromCore
        // console.warn(coreUser.value.claims)
        if (coreUser.value) {
            // console.warn("claims", Number(coreUser.value.claims))
            // console.warn("gifts", Number(coreUser.value.gifts))
            // console.warn("isValue", coreUser.value.isValue)
            console.warn("level", Number(coreUser.value.level))
            // console.warn("whose", String(coreUser.value.whose))

            const maxLevel = Number(coreUser.value.level)
            for (let i = 0; i < maxLevel; i++) {
                // response from getMatrixUser() contains user and total
                const matrixUser = await $B.getMatrixUser(i)
                console.info('____________________')
                console.warn('matrixUser for to maxLevel ' + i)
                console.info('user:')
                console.log(matrixUser.user.index)
                console.log(matrixUser.user.isRight)
                console.log(matrixUser.user.isValue)
                console.log(matrixUser.user.parent)
                console.log(matrixUser.user.plateau)
                console.info('--------------------')
                console.info('total: ', Number(matrixUser.total))
            }
        }
    }

    return {
        connectWallet,
        checkRegister,
        checkConnected,
        getAddressesGlobalTotal,
        getWhoseOfUser,
        getReferralEarn,
        getGiftsAccrued,
        getGiftsSpent,
        getDescendants,
    }
})

// todo: when going to auth protected page - need to run authorization
