import Web3 from 'web3'

import type {
  TCurrency,
  ICommon, IExternal, INetwork
} from '@/libs/blockchain/types'

import CoreJson from '~/artifacts/contracts/Core.json'
import {useStorage} from "@vueuse/core";
import {GetEvents} from "~/libs/events-infura/abi-events";

const walletStorage = useStorage('connected-wallet')

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
  private static _instance_rpc: any
  private static _instance_mm: any
  methods: any
  // todo: change to two instances for CoreMM and CoreRPC
  constructor(instanceType: string, web3: any, contractAddress: string) {
    if (instanceType === "RPC" && !CoreContract._instance_rpc) {
      web3.eth.handleRevert = true
      CoreContract._instance_rpc = new web3.eth.Contract(
        CoreJson.abi,
        contractAddress,
      )
      return CoreContract._instance_rpc
    }

    if (instanceType === "MM" && !CoreContract._instance_mm) {
      web3.eth.handleRevert = true
      CoreContract._instance_mm = new web3.eth.Contract(
          CoreJson.abi,
          contractAddress,
      )
      return CoreContract._instance_mm
    }
  }
}

class Common implements ICommon {

  Emit: any
  Ethereum: any
  Config: any
  Web3MM: any
  Web3RPC: any
  CoreMM: any
  CoreRPC: any
  Wallet: any
  CoreUser: any

  constructor (emitFn: any) {
    this.Emit = emitFn
  }

  async init(globalThis: any) {
    if (!globalThis['ethereum']) {
      this.ThrowAlert('danger', 'Please install Metamask and reload the page 1', 'init')
    } else {
      this.Ethereum = globalThis['ethereum']
      this.Ethereum.on('accountsChanged', (accounts: any[]) => {
        if (this.Wallet !== accounts[0]) {
          this.Wallet = accounts[0]
          this.Emit('wallet-updated', this.Wallet)
          walletStorage.value = this.Wallet
        }
      })

      const publicConfig = new Config()
      this.Config = publicConfig['public']
      this.Web3MM = new Web3(this.Ethereum)
      this.Web3RPC = new Web3(this.Config.RPC_URL)
      this.CoreMM = new CoreContract('MM', this.Web3MM, this.Config.CONTRACT_ADDRESS)
      this.CoreRPC = new CoreContract('RPC', this.Web3RPC, this.Config.CONTRACT_ADDRESS)
    }
    if (!this.Web3MM || !this.Ethereum) {
      // metamask is not installed
      this.isInstalled = false
      this.EmitDisabled('connect', true)
    }
  }

  EmitDisabled (cause: string, status: boolean) {
    if (this.Emit) {
      this.Emit('disabled', {
        cause,
        status,
      })
    }
  }

  getErrorMsg (error: string|object) : string|void {
    let message = undefined
    if (typeof error == 'string') {
      if (
          error.includes('reverted with reason string')
      ) {
        // @ts-ignore
        message = error.match(/transaction:\s(.+?)"/)[1]
      } else if (error.includes('while formatting outputs from RPC')) {
        // "message":"Nonce too high. Expected nonce to be 0 but got 4. Note that transactions can't be queued when auto mining."
        message = error.match(/"message":"([^"]+)"/)[1]
      } else {
        message = error
      }
      return message
    } else if (typeof error == 'object') {
      if (
          error.data?.message?.includes('reverted with reason string')
      ) {
        // "Error: VM Exception while processing transaction: reverted with reason string 'user already registered'"
        message = error.data.message.match(/with reason string '([^']+)'/i)[1]
      } else if (error?.message?.includes('while formatting outputs from RPC')) {
        // "message":"Nonce too high. Expected nonce to be 0 but got 4. Note that transactions can't be queued when auto mining."
        message = error.message.match(/"message":"([^"]+)"/)[1]
      }
      return message

    } else {
      if (this.Emit) {
        this.Emit('alert', {
          type: 'unknown',
          message: 'unknown error',
        })
      }
    }
  }

  ThrowAlert (type: string, error: any, clarification: string = '') {
    let message: any
    if (type === 'danger') {
      message = this.getErrorMsg(error)
    } else {
      message = error
    }
    if (this.Emit) {
      this.Emit('alert', {
        type,
        message,
        clarification,
      })
    }
    return false
  }
}

class Network extends Common implements INetwork {
  constructor (emitFn: any) {
    super(emitFn)
  }

  private checkInstalledMetamask (): boolean {
    return Boolean(this.Ethereum && this.Ethereum.isMetaMask);
  }

  async setNetwork (): Promise<void | boolean> {
    if (!this.checkInstalledMetamask() || !this.Ethereum) {
      this.Wallet = ""
      this.Emit('wallet-updated', this.Wallet)
      walletStorage.value = this.Wallet

      return this.ThrowAlert('danger', 'Metamask is not installed!', 'setNetwork')
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
          this.ThrowAlert('danger', e.message, 'setNetwork')
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
      this.ThrowAlert('danger', e.message, 'addNetwork')
    }
  }
}

export class External extends Network implements IExternal {
  constructor (emitFn: any) {
    super(emitFn)
  }

  isInstalled = false
  isConnected = false
  isRegistered = false

  /**
   * I have over there two stages.
   * 1) check window.Ethereum, set network etc.
   * 2) get connected wallet and save it in this.Wallet
   */
  async connect (): Promise<void> {
    this.EmitDisabled('connect', true)
    await this.setNetwork()
    try {
      if (!this.Web3MM || !this.Ethereum) {
        // metamask is not installed
        this.Wallet = ""
        walletStorage.value = ""
        this.Emit('wallet-updated', this.Wallet)

        this.isInstalled = false

        this.EmitDisabled('connect', true)
      } else {
        // metamask installed
        const accounts = await this.Ethereum.request({ method: 'eth_requestAccounts' })
        this.Wallet = accounts[0]
        if (this.Wallet) {
          this.isConnected = true
        }

        this.Emit('wallet-updated', this.Wallet)
        walletStorage.value = this.Wallet

        this.CoreUser = await this.getUserFromCore()
        if (this.CoreUser) {
          this.isRegistered = true
        }
      }
    } catch (e: any) {
      this.ThrowAlert('danger', e.message, 'connect')
    } finally {
      this.EmitDisabled('connect', false)
    }
  }

  async getUserFromCore (): Promise<void | boolean> {
    if (!this.Wallet) {
      this.ThrowAlert('danger', 'Please connect Metamask', 'getUserFromCore')
    } else {
      try {
        const coreName = 'CoreRPC'
        // const coreName = 'CoreMM'

        this.EmitDisabled(`getUserFromCore`, true)
        if (!this[coreName] || !this.Wallet) {
          return false
        }

        const resp = await this[coreName]
          .methods.getUserFromCore(this.Wallet)
          .call({
            from: this.Wallet,
            // to: this.Config.CONTRACT_ADDRESS,
            // gasLimit: 5000000,
          })

        // display resp in web interface
        if (!resp.isValue) {
          // msg = `111 user ${this.Wallet} is not registered`
          // this.ThrowAlert('primary', msg)
          return false
        } else {
          this.isRegistered = true
          return resp
        }
      } catch (e: any) {
        this.ThrowAlert('danger', e.message, 'getUserFromCore')
      } finally {
        this.EmitDisabled(`getUserFromCore`, false)
      }
    }
  }

  async getWalletByIndexFromMatrix(level: number, index: number) {
    if (!this.Wallet) {
      this.ThrowAlert('danger', 'Please connect Metamask', 'getWalletByIndexFromMatrix')
    } else {
      try {
        this.EmitDisabled(`getWalletsByIndexFromMatrix`, true)
        if (!this.CoreRPC || !this.Wallet) {
          return false
        }
        return await this.CoreRPC
            .methods.getWalletByIndexFromMatrix(level, index)
            .call({
              from: this.Wallet,
            })
      } catch (e: any) {
        this.ThrowAlert('danger', e.message, 'getWalletByIndexFromMatrix')
      } finally {
        this.EmitDisabled(`getWalletsByIndexFromMatrix`, false)
      }
    }
  }

  async getMaxLevel(){
    return Number(await this.CoreRPC.methods.maxLevel().call())
  }

  async getMatrixUser(level: number | string): Promise<void | boolean> {
    try {
      this.EmitDisabled(`getMatrixUser`, true)
      if (!this.CoreRPC || !this.Wallet) {
        return false
      }
      const resp = await this.CoreRPC
        .methods.getUserFromMatrix(level, this.Wallet)
        .call({
          from: this.Wallet,
          to: new Config().CONTRACT_ADDRESS,
        })
      // todo: display resp in web interface
      let msg
      if (!resp.user.isValue) {
        msg = `user ${this.Wallet} is not registered`
        // this.ThrowAlert('danger', msg)
        console.error(msg)
      } else {
        return resp
      }
    } catch (e: any) {
      this.ThrowAlert('danger', e.message, 'getMatrixUser')
    } finally {
      this.EmitDisabled(`getMatrixUser`, false)
    }
  }

  async getAddressesGlobalTotal (): Promise<any> {
    try {
      this.EmitDisabled(`getAddressesGlobalTotal`, true)
      if (!this.CoreRPC) return false
      return this.CoreRPC.methods.AddressesGlobalTotal.call().call();
    } catch (e: any) {
      this.ThrowAlert('danger', e.message, 'getAddressesGlobalTotal')
    } finally {
      this.EmitDisabled(`getAddressesGlobalTotal`, false)
    }
  }

  // async testEvents (owner: string) {
  //   return await this.CoreRPC.getPastEvents('ClaimsSpent', {
  //     filter: {
  //       owner,
  //     },
  //     fromBlock: 0,
  //     toBlock: 'latest'
  //   })
  // }

  // async getReferralEarn () {
  //   return await this.CoreRPC.getPastEvents('ReferralEarn', {
  //     filter: {
  //       whose: this.Wallet,
  //     },
  //     fromBlock: FromBlock,
  //     toBlock: 'latest',
  //   })
  // }

  // async getClaimsAppear () {
  //   return await this.CoreRPC.getPastEvents('ClaimsAppear', {
  //     filter: {
  //       owner: this.Wallet,
  //     },
  //     fromBlock: FromBlock,
  //     toBlock: 'latest',
  //   })
  // }

  // async getBelowTwoAppear () {
  //   return await this.CoreRPC.getPastEvents('BelowTwoAppear', {
  //     filter: {
  //       receiver: this.Wallet,
  //     },
  //     fromBlock: FromBlock,
  //     toBlock: 'latest',
  //   })
  // }

  // async getDirectTransfers () {
  //   return await this.CoreRPC.getPastEvents('DirectTransfer', {
  //     fromBlock: FromBlock,
  //     toBlock: 'latest',
  //   })
  // }

  /**
   * @param wallet - wallet address of id0, id1 or another
   */
  async getIncomesForId (wallet: string) {
    const belowTwoEvents = await GetEvents('BelowTwoAppear', [wallet])
    let sumBelowTwoAmount = (belowTwoEvents.length > 0)
        ? belowTwoEvents.reduce((accumulator: any, current: any) => BigInt(accumulator) + current.amount, 0n) : 0n

    const claimsAppearEvents = await GetEvents('ClaimsAppear', [wallet])
    let sumClaimsAppearAmount = (claimsAppearEvents.length > 0)
        ? claimsAppearEvents.reduce((accumulator: any, current: any) => BigInt(accumulator) + current.levelPrice, 0n) : 0n


    const claimsReferralEvents = await GetEvents('ReferralEarn', [null, wallet])
    let sumClaimsReferralAmount = (claimsReferralEvents.length > 0)
        ? claimsReferralEvents[claimsReferralEvents.length - 1].value
        : 0n

    return Number(
        sumBelowTwoAmount
        + sumClaimsAppearAmount
        + sumClaimsReferralAmount
    ) / 10**18
  }

  // async getClaimSpent () {
  //   return await this.CoreRPC.getPastEvents('ClaimsSpent', {
  //     filter: {
  //       owner: this.Wallet,
  //     },
  //     fromBlock: FromBlock,
  //     toBlock: 'latest',
  //   })
  // }

  // async getWithdrawals () {
  //   return await this.CoreRPC.getPastEvents('ClaimsWithdraw', {
  //     filter: {
  //       owner: this.Wallet,
  //     },
  //     fromBlock: FromBlock,
  //     toBlock: 'latest',
  //   })
  // }

  async getTotalFromMatrix (matrixIndex: number) {
    return  await this.CoreRPC.methods.getTotalFromMatrix(matrixIndex)
        .call({from: this.Wallet})
  }

  async GetCoreUserByMatrixPosition (level: number | string, userIndex: number | string): Promise<void|boolean> {
    try {
      this.EmitDisabled(`GetCoreUserByMatrixPosition`, true)
      if (!this.CoreRPC) return false
      const resp = await this.CoreRPC
        .methods.getCoreUserByMatrixPosition(level, userIndex)
        .call({
          from: this.Wallet,
          to: new Config().CONTRACT_ADDRESS,
        })
      let msg
      if (!resp.user.isValue) {
        msg = `user N ${userIndex} is not registered`
      } else {
        msg = `
GetCoreUserByMatrixPosition() method response:
address: ${resp.userAddress}
claims: ${this.CoreRPC.utils.fromWei(resp.user.claims, "ether")} BNB
gifts: ${this.CoreRPC.utils.fromWei(resp.user.gifts, "ether")} BNB
level: ${resp.user.level}
whose: ${resp.user.whose}
`
      }
      this.ThrowAlert('primary', msg, 'GetCoreUserByMatrixPosition')
    } catch (e: any) {
      this.ThrowAlert('danger', e.message, 'GetCoreUserByMatrixPosition')
    } finally {
      this.EmitDisabled(`GetCoreUserByMatrixPosition`, false)
    }
  }

  async getPayUnit (){
    this.EmitDisabled(`payUnit`, true)
    if (!this.CoreMM) return false
    try {
      return await this.CoreRPC.methods
          .payUnit()
          .call({
            from: this.Wallet,
          });
    } catch (e) {
      this.ThrowAlert('danger', e.message, 'getPayUnit')
    } finally {
      this.EmitDisabled(`payUnit`, false)
    }
  }

  async registerWhose (whose: string): Promise<void|boolean> {
    try {
      this.EmitDisabled(`registerWhose`, true)

      if (!this.CoreMM) return false

      const estimatedGas = await this.CoreMM
          .methods
          .register(whose)
          .estimateGas({
            from: this.Wallet,
            value: 10000000000000000,
          });
      // const estimatedGasWithReserve = BigInt(Math.round(Number(estimatedGas) * 1.1))

      const gasPrice = await this.Web3RPC.eth.getGasPrice()

      const resp = await this.CoreMM
          .methods
          .register(whose)
          .send({
            from: this.Wallet,
            value: 10000000000000000,
            // gasLimit: 5000000, // not required
            // gas: 300000, // 274633
            gasLimit: estimatedGas,
            gasPrice,
          })

      // display resp in web interface
      const msg = `
registerWhose() method params:
FROM: ${resp.from}
TO: ${resp.to}
GAS: ${resp.gasUsed}
TX: ${resp.transactionHash}
`
      this.ThrowAlert('success', msg, 'registerWhose')
    } catch (e: any) {
      this.ThrowAlert('danger', e, 'registerWhose')
    } finally {
      this.EmitDisabled(`registerWhose`, false)
    }
  }

  async withdrawClaim (amount: number | string): Promise<void|boolean> {
    this.EmitDisabled(`withdrawClaim`, true)
    try {
      if (!this.CoreMM) return false
      const weiAmount = this.Web3MM.utils.toWei(String(amount), "ether")
      const estimatedGas = await this.CoreMM.methods
          .withdrawClaim(weiAmount)
          .estimateGas({
            from: this.Wallet,
          });
      // const estimatedGasWithReserve = BigInt(Math.round(Number(estimatedGas) * 1.1))
      const gasPrice = await this.Web3RPC.eth.getGasPrice()
      const resp = await this.CoreMM.methods
        .withdrawClaim(weiAmount)
        .send({
          from: this.Wallet,
          gasLimit: estimatedGas,
          // gasLimit: 310000, // not required
          gasPrice,
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
      this.ThrowAlert('success', msg, 'withdrawClaim')
    } catch (e: any) {
      this.ThrowAlert('danger', e.message, 'withdrawClaim')
    } finally {
      this.EmitDisabled(`withdrawClaim`, false)
    }
  }

  async sendAmount (amount: string | number): Promise<void> {
    this.EmitDisabled(`sendAmount`, true)
    try {
      const estimatedGas = await this.Web3MM.eth.estimateGas({
        from: this.Wallet,
        to: this.Config.CONTRACT_ADDRESS,
        value: this.Web3MM.utils.toWei(String(amount), "ether"),
      })

      // const estimatedGasWithReserve = BigInt(Math.round(Number(estimatedGas) * 1.1))

      const gasPrice = await this.Web3RPC.eth.getGasPrice()
      // const gasPrice = this.Web3MM.utils.fromWei(resultPrice, 'ether')
      // console.log(gasPrice)

      const resp = await this.Web3MM.eth.sendTransaction({
        from: this.Wallet,
        to: this.Config.CONTRACT_ADDRESS,
        value: this.Web3MM.utils.toWei(String(amount), "ether"),

        gasPrice,
        gasLimit: estimatedGas, // 57472n

        // gasLimit: 36857, // not enough
        // gasLimit: 36858, // is ok
      })

      const msg = `
sendAmount() method params:
FROM: ${resp.from}
TO: ${resp.to}
GAS: ${resp.gasUsed}
TX: ${resp.transactionHash}
`
      this.ThrowAlert('success', msg, 'sendAmount')
    } catch (e: any) {
      if (e['data']) {
        this.ThrowAlert('danger', e.data.message, 'sendAmount')
      } else {
        this.ThrowAlert('danger', e, 'sendAmount')
      }
    } finally {
      this.EmitDisabled(`sendAmount`, false)
    }
  }

  async withdrawTen (): Promise<void|boolean> {
    this.EmitDisabled(`withdrawTen`, true)
    try {
      if (!this.CoreMM) return false
      const estimatedGas = await this.CoreMM
          .methods
          .getTenPercentOnceYear()
          .estimateGas({
            from: this.Wallet,
          });
      // const estimatedGasWithReserve = BigInt(Math.round(Number(estimatedGas) * 1.1))

      const gasPrice = await this.Web3RPC.eth.getGasPrice()

      await this.CoreMM.methods
        .getTenPercentOnceYear()
        .send({
          from: this.Wallet,
          // gasLimit: 310000, // not required
          gasLimit: estimatedGas,
          gasPrice,
        })
      this.ThrowAlert('success', "check your balance", 'withdrawTen')

    } catch (e: any) {
      this.ThrowAlert('danger', e.message, 'withdrawTen')
    } finally {
      this.EmitDisabled(`withdrawTen`, false)
    }
  }
}
