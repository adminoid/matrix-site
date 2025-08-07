// returns runtimeConfig property for nuxt.config.ts

export default () => ({
    public: {
        APP_LINK:
            (process.env.APP_LINK)
                ? process.env.APP_LINK
                : '',
        QR_IMG:
            (process.env.QR_IMG)
                ? process.env.QR_IMG
                : '',
        // 97(0x61) - testnet, 1337(0x7A69) - hardhat, 56(0x38) - mainnet
        CHAIN_ID:
            (process.env.CHAIN_ID)
                ? process.env.CHAIN_ID
                : '',
        CHAIN_ID_DECIMAL:
            (process.env.CHAIN_ID_DECIMAL)
                ? process.env.CHAIN_ID_DECIMAL
                : '',
        RPC_URL:
            (process.env.RPC_URL)
                ? process.env.RPC_URL
                : '',
        CHAIN_NAME:
            (process.env.CHAIN_NAME)
                ? process.env.CHAIN_NAME
                : '',
        CONTRACT_ADDRESS:
            (process.env.CONTRACT_ADDRESS)
                ? process.env.CONTRACT_ADDRESS
                : '',
        ID_ADDRESS_0:
            (process.env.ID_ADDRESS_0)
                ? process.env.ID_ADDRESS_0
                : '',
        ID_ADDRESS_1:
            (process.env.ID_ADDRESS_1)
                ? process.env.ID_ADDRESS_1
                : '',
        CURRENCY_NAME:
            (process.env.CURRENCY_NAME)
                ? process.env.CURRENCY_NAME
                : '',
        CURRENCY_SYMBOL:
            (process.env.CURRENCY_SYMBOL)
                ? process.env.CURRENCY_SYMBOL
                : '',
        CURRENCY_DECIMALS:
            (process.env.CURRENCY_DECIMALS)
                ? process.env.CURRENCY_DECIMALS
                : '18',
        INFURA_KEY:
            (process.env.INFURA_KEY)
                ? process.env.INFURA_KEY
                : '',
        BSCSCAN_API_KEY:
            (process.env.BSCSCAN_API_KEY)
                ? process.env.BSCSCAN_API_KEY
                : '',
        COINGECKO_API_KEY:
            (process.env.COINGECKO_API_KEY)
                ? process.env.COINGECKO_API_KEY
                : '',
    }
})
