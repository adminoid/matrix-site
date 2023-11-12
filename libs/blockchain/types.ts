export type TCurrency = {
  name: string,
  symbol: string,
  decimals: number,
}

export interface IExternal {
  // technical methods
  connect(): Promise<void>
  // info methods
  getCoreUser(wallet: string): Promise<void>
  getMatrixUser(level: number|string, wallet: string): Promise<void>

  // interaction methods
  registerWhose(whose: string): Promise<void>
  withdrawClaim(amount: number | string): Promise<void>
  sendAmount(amount: string|number): Promise<void>
  withdrawTen(): Promise<void>
}

export interface INetwork {
  setNetwork(): Promise<void>
}

export interface ICommon {
  // alerts: TAlert[]
  // disabled: TDisabled
  Nuxt: any
  Ethereum: any
  Web3: any
  Config: any
  Core: any
  Wallet: string
  EmitDisabled(type: string, status: boolean): void
  ThrowAlert(type: string, error: any): void
}
