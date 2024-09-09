import {External} from "~/libs/blockchain/classes";
import {useNuxtApp} from "#app";
import {getGlobalThis} from "@vue/shared";

let BC = ref({})

// replace for init and onchange
const Wallet = ref('0x71bE63f3384f5fb98995898A86B02Fb2426c5788')

const checkIsClient = () => import.meta.client && !import.meta.server

if (checkIsClient()) {
    console.info('THIS IS A CLIENT')
    if (Object.keys(BC.value).length === 0) {
        console.info('updating BC ref...')
        // make instance of External class
        const B = new External(useNuxtApp(), Wallet.value)
        const glob = getGlobalThis()
        await B.init(glob)
        BC.value = B
    }
}

export const useWeb3Store = () => (checkIsClient()) ? BC : false

const giftsAccrued = ref([])
// TODO: here is PROXY
export async function getGiftsAccruedProxy() {
    if (checkIsClient() && giftsAccrued.value.length === 0) {
        const tmp = await BC?.value?.getGiftsAccrued()
        console.info('tmp', tmp)
        return tmp
    }
    return giftsAccrued
}