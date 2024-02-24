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

    let coreUser
    const checkRegister = async () => {
        if ($B.Wallet.value) {
            coreUser = await $B.getUserFromCore()
            if (coreUser) {
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

        console.info("$B.Wallet.value")
        console.log($B.Wallet.value)

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

    const getClaimsAppear = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getClaimsAppear()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getClaimSpent = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getClaimSpent()
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
        // index: 0n
        // isRight: false
        // isValue: true
        // parent: 0n
        // plateau: 1n
        const matrixData = []
        if (coreUser) {
            const maxLevel = Number(coreUser.level)
            for (let i = 0; i < maxLevel; i++) {
                // response from getMatrixUser() contains user and total
                const matrixReceivedData = await $B.getMatrixUser(i)
                matrixData[i] = {
                    user: {
                        index: Number(matrixReceivedData.user.index),
                        isRight: matrixReceivedData.user.isRight,
                        isValue: matrixReceivedData.user.isValue,
                        parent: Number(matrixReceivedData.user.parent),
                        plateau: Number(matrixReceivedData.user.plateau),
                    },
                    total: Number(matrixReceivedData.total),
                }
            }
        }
        return matrixData
    }

    // todo -- add getUserFromCore and same with mat

    const getUserData = async () => {
        if (coreUser) {
            const matrixUser = await $B.getMatrixUser(0)
            if (matrixUser) {
                return {
                    core: coreUser,
                    matrix: matrixUser.user,
                }
            }
        }
        return false
    }

    const getFirstUsers = async (total) => {
        const wallets = []
        for (let i = 0; i < total; i++) {
            wallets.push(await $B.getWalletByIndexFromMatrix(0, i))
        }
        return wallets
    }

    return {
        connectWallet,
        checkRegister,
        checkConnected,
        getAddressesGlobalTotal,
        getWhoseOfUser,
        getReferralEarn,
        getClaimsAppear,
        getClaimSpent,
        getGiftsAccrued,
        getGiftsSpent,
        getDescendants,
        getUserData,
        getFirstUsers,
    }
})

// todo: when going to auth protected page - need to run authorization
