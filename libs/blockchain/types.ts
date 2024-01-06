export type TCurrency = {
  name: string,
  symbol: string,
  decimals: number,
}

export interface IExternal {
  getCoreUser(wallet: string): Promise<void | boolean>
  getMatrixUser(level: number | string, wallet: string): Promise<void | boolean>

  getAddressesGlobalTotal(): Promise<any>
  getWhoseOfUser(): Promise<any>

  // interaction methods
  registerWhose(whose: string): Promise<void|boolean>
  withdrawClaim(amount: number | string): Promise<void|boolean>
  sendAmount(amount: string|number): Promise<void>
  withdrawTen(): Promise<void|boolean>
}

export interface INetwork {
  setNetwork(): Promise<void | boolean>
}

export interface ICommon {
  // alerts: TAlert[]
  // disabled: TDisabled
  Nuxt: any
  Ethereum: any
  Web3: any
  Config: any
  Core: any
  EmitDisabled(type: string, status: boolean): void
  ThrowAlert(type: string, error: any): void
}
