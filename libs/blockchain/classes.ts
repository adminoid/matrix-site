import Web3 from 'web3'

import type {
  TCurrency,
  ICommon, IExternal, INetwork
} from '@/libs/blockchain/types'

import CoreJson from '~/artifacts/contracts/Core.sol/Core.json'

class Config {
  private static _instance: any
  CONTRACT_ADDRESS: string = ""
  CHAIN_ID: string = ""
  CHAIN_NAME!: string
  RPC_URL!: string
  CURRENCY: TCurrency = { name: '', symbol: '', decimals: 0}
  public!: object
  constructor() {
    if (!Config._instance) {
      Config._instance = useRuntimeConfig()
    }
    return Config._instance
  }
}

class CoreContract {
  private static _instance: any
  methods: any
  constructor(web3: any, contractAddress: string) {
    if (!CoreContract._instance) {
      web3.eth.handleRevert = true
      CoreContract._instance = new web3.eth.Contract(
        CoreJson.abi,
        contractAddress,
      )
    }
    return CoreContract._instance
  }
}

class Common implements ICommon {
  Nuxt: any
  Ethereum: any
  Web3: any
  Config: any
  Core: any
  Storage: any
  constructor (nuxt: any, storage: any) {
    this.Nuxt = nuxt
    this.Storage = storage
  }
  async init(globalThis: any) {
    if (!globalThis['ethereum']) {
      this.ThrowAlert('danger', 'Please install Metamask and reload the page 1')
    } else {
      this.Ethereum = globalThis['ethereum']
      this.Ethereum.on('accountsChanged', (accounts: any[]) => {
        this.Storage.value = accounts[0]
      })

      const publicConfig = new Config()
      this.Config = publicConfig['public']
      // this.Web3 = new Web3(this.Ethereum)
      this.Web3 = new Web3(this.Config.RPC_URL)
      this.Core = new CoreContract(this.Web3, this.Config.CONTRACT_ADDRESS)
    }
    if (!this.Web3 || !this.Ethereum) {
      // metamask is not installed
      this.EmitDisabled('connect', true)
    }
  }
  EmitDisabled (cause: string, status: boolean) {
    if (this.Nuxt.$emit) {
      this.Nuxt.$emit('disabled', {
        cause,
        status,
      })
    }
  }
  ThrowAlert (type: string, error: any) {
    let message: any = error
    // only for error messages
    if (
      type === 'danger'
      && typeof error === 'string'
      && error.includes('reverted with reason string')
    ) {
      // @ts-ignore
      message = error.match(/transaction:\s(.+?)"/)[1]
    } else if (error.includes('while formatting outputs from RPC')) {
      // "message":"Nonce too high. Expected nonce to be 0 but got 4. Note that transactions can't be queued when auto mining."
      message = error.match(/"message":"([^"]+)"/)[1]
    }
    if (this.Nuxt.$emit) {
      this.Nuxt.$emit('alert', {
        type,
        message,
      })
    }

    return false
  }
}

class Network extends Common implements INetwork {
  constructor (nuxt: any, storage: any) {
    super(nuxt, storage)
  }
  private checkInstalledMetamask (): boolean {
    return Boolean(this.Ethereum && this.Ethereum.isMetaMask);
  }
  async setNetwork (): Promise<void | boolean> {
    if (!this.checkInstalledMetamask() || !this.Ethereum) {
      this.Storage.value = ''
      return this.ThrowAlert('danger', 'Metamask is not installed!')
    } else {
      try {
        // check if the chain that for connect to is installed
        await this.Ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: this.Config.CHAIN_ID }],
        })
      } catch (e: any) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (e.code === 4902) {
          await this.addNetwork()
        } else {
          this.ThrowAlert('danger', e.message)
        }
      }
    }
  }
  private async addNetwork (): Promise<void> {
    try {
      await this.Ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: this.Config.CHAIN_ID,
            chainName: this.Config.CHAIN_NAME,
            rpcUrls: [this.Config.RPC_URL],
            nativeCurrency: this.Config.CURRENCY,
          },
        ],
      })
    } catch (e: any) {
      this.ThrowAlert('danger', e.message)
    }
  }
}

export class External extends Network implements IExternal {
  constructor (nuxt: any, storage: any) {
    super(nuxt, storage)
  }

  async connect (): Promise<void> {
    this.EmitDisabled('connect', true)
    const res = await this.setNetwork()
    try {
      if (!this.Web3 || !this.Ethereum) {
        // metamask is not installed
        this.Storage.value = ""
        this.EmitDisabled('connect', true)
      } else {
        // metamask installed
        const accounts = await this.Ethereum.request({ method: 'eth_requestAccounts' })
        this.Storage.value = accounts[0]
      }
    } catch (e: any) {
      this.ThrowAlert('danger', e.message)
    } finally {
      this.EmitDisabled('connect', false)
    }
  }

  async getCoreUser (): Promise<void | boolean> {
    if (!this.Storage.value) {
      this.ThrowAlert('danger', 'Please connect Metamask')
    } else {
      try {
        this.EmitDisabled(`getCoreUser`, true)
        if (!this.Core || !this.Storage.value) {
          return false
        }
        const resp = await this.Core
          .methods.getUserFromCore(this.Storage.value)
          .call({
            from: this.Storage.value,
          })
        // display resp in web interface
        let msg
        if (!resp.isValue) {
          msg = `user ${this.Storage.value} is not registered`
          this.ThrowAlert('primary', msg)
        } else {
          return resp
        }
      } catch (e: any) {
        this.ThrowAlert('danger', e.message)
      } finally {
        this.EmitDisabled(`getCoreUser`, false)
      }
    }
  }

  async getMatrixUser(level: number | string, wallet: string): Promise<void | boolean> {
    try {
      this.EmitDisabled(`getMatrixUser`, true)
      if (!this.Core) return false
      const resp = await this.Core
        .methods.getUserFromMatrix(level, wallet)
        .call({
          from: this.Storage.value,
          to: new Config().CONTRACT_ADDRESS,
        })
      // todo: display resp in web interface
      let msg
      if (!resp.user.isValue) {
        msg = `user ${wallet} is not registered`
        this.ThrowAlert('primary', msg)
      } else {
        return resp
      }
    } catch (e: any) {
      this.ThrowAlert('danger', e.message)
    } finally {
      this.EmitDisabled(`getMatrixUser`, false)
    }
  }

  async getAddressesGlobalTotal (): Promise<any> {
    try {
      this.EmitDisabled(`getAddressesGlobalTotal`, true)
      if (!this.Core) return false
      return this.Core.methods.AddressesGlobalTotal.call().call();
    } catch (e: any) {
      this.ThrowAlert('danger', e.message)
    } finally {
      this.EmitDisabled(`getAddressesGlobalTotal`, false)
    }
  }

  async getWhoseOfUser () {
    return await this.Core.getPastEvents('WhoseRegistered', {
      filter: {
        whose: this.Storage.value,
      },
      fromBlock: 0,
      toBlock: 'latest',
    })
  }

  async getReferralEarn () {
    return await this.Core.getPastEvents('ReferralEarn', {
      filter: {
        whose: this.Storage.value,
      },
      fromBlock: 0,
      toBlock: 'latest',
    })
  }

  async GetCoreUserByMatrixPosition (level: number | string, userIndex: number | string): Promise<void|boolean> {
    try {
      this.EmitDisabled(`GetCoreUserByMatrixPosition`, true)
      if (!this.Core) return false
      const resp = await this.Core
        .methods.getCoreUserByMatrixPosition(level, userIndex)
        .call({
          from: this.Storage.value,
          to: new Config().CONTRACT_ADDRESS,
        })
      // todo: display resp in web interface
      let msg
      if (!resp.user.isValue) {
        msg = `user N ${userIndex} is not registered`
      } else {
        msg = `
GetCoreUserByMatrixPosition() method response:
address: ${resp.userAddress}
claims: ${this.Web3.utils.fromWei(resp.user.claims, "ether")} BNB
gifts: ${this.Web3.utils.fromWei(resp.user.gifts, "ether")} BNB
level: ${resp.user.level}
whose: ${resp.user.whose}
`
      }
      this.ThrowAlert('primary', msg)
    } catch (e: any) {
      this.ThrowAlert('danger', e.message)
    } finally {
      this.EmitDisabled(`GetCoreUserByMatrixPosition`, false)
    }
  }

  async registerWhose (whose: string): Promise<void|boolean> {
    try {
      this.EmitDisabled(`registerWhose`, true)
      // const value = await this.Core.methods
      //   .payUnit()
      //   .call({
      //     from: this.Wallet,
      //   });
      if (!this.Core) return false
      const resp = await this.Core
      .methods.register(whose).send({
        from: this.Storage.value,
        value: 10000000000000000,
        // gasLimit: 5000000, // not required
        gas: 300000, // 274633
      })

      // display resp in web interface
      const msg = `
registerWhose() method params:
FROM: ${resp.from}
TO: ${resp.to}
GAS: ${resp.gasUsed}
TX: ${resp.transactionHash}
`
      this.ThrowAlert('success', msg)
    } catch (e: any) {
      this.ThrowAlert('danger', e.message)
    } finally {
      this.EmitDisabled(`registerWhose`, false)
    }
  }
  async withdrawClaim (amount: number | string): Promise<void|boolean> {
    this.EmitDisabled(`withdrawClaim`, true)
    try {
      if (!this.Core) return false
      const resp = await this.Core.methods
        .withdrawClaim(this.Web3.utils.toWei(String(amount), "ether"))
        .send({
          from: this.Storage.value,
          gasLimit: 310000, // not required
        });
      // from - address for withdrawing
      // gasUsed - used gas
      const msg = `
withdrawClaim() method params:
FROM: ${resp.from}
AMOUNT: ${amount}
GAS: ${resp.gasUsed}
TX: ${resp.transactionHash}
`
      this.ThrowAlert('success', msg)
    } catch (e: any) {
      this.ThrowAlert('danger', e.message)
    } finally {
      this.EmitDisabled(`withdrawClaim`, false)
    }
  }
  async sendAmount (amount: string | number): Promise<void> {
    this.EmitDisabled(`sendAmount`, true)
    try {
      const resp = await this.Web3.eth.sendTransaction({
        from: this.Storage.value,
        to: this.Config.CONTRACT_ADDRESS,
        value: this.Web3.utils.toWei(String(amount), "ether")
      });
      const msg = `
sendAmount() method params:
FROM: ${resp.from}
TO: ${resp.to}
GAS: ${resp.gasUsed}
TX: ${resp.transactionHash}
`
      this.ThrowAlert('success', msg)
    } catch (e: any) {
      this.ThrowAlert('danger', e.message)
    } finally {
      this.EmitDisabled(`sendAmount`, false)
    }
  }
  async withdrawTen (): Promise<void|boolean> {
    this.EmitDisabled(`withdrawTen`, true)
    try {
      if (!this.Core) return false
      await this.Core.methods
        .getTenPercentOnceYear()
        .send({
          from: this.Storage.value,
          gasLimit: 310000, // not required
        })
      this.ThrowAlert('success', "check your balance")

    } catch (e: any) {
      this.ThrowAlert('danger', e.message)
    } finally {
      this.EmitDisabled(`withdrawTen`, false)
    }
  }
}
