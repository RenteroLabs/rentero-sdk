import { ethers, Signer, BigNumber } from 'ethers';
import { MARKET_ABI, RENTERO_MODE, SUPPORT_NETWORK, DEFAULT_MARKET_ADDRESS } from './constants';

type RenteroConfig = {
  /** target blockchain network */
  targetChain: SUPPORT_NETWORK,
  /** lend NFT mode, current only support installment mode */
  renteroType: RENTERO_MODE,
  /** specify a specific market address to override the above configuration */
  marketAddress?: string,
}

/**
 * Rentero Protocol Core Apis 
 */
export default class Rentero {

  #RenteroMarket: ethers.Contract
  #rentMode: RENTERO_MODE
  #chain: SUPPORT_NETWORK

  /**
   * Rentero Protocol initialize 
   * @param signer 
   * @param config 
   */
  constructor(
    signer: Signer,
    config: RenteroConfig,
  ) {
    this.#rentMode = config.renteroType
    this.#chain = config.targetChain

    let marketAddress: string
    if (config.marketAddress) {
      marketAddress = config.marketAddress
    } else {
      marketAddress = DEFAULT_MARKET_ADDRESS[[this.#chain, this.#rentMode].join('-')]
    }
    this.#RenteroMarket = new ethers.Contract(marketAddress, MARKET_ABI, signer)
  }


  /**
   * lend NFT to market
   * @param nftAddress lend NFT Collection address
   * @param tokenId NFT token id
   * @param erc20Address payment token contract address
   * @param whitelist whitelist address, only support one whitelist address, if don't need whitelist, please pass zero address: 0x0000000000000000000000000000000000000000
   * @param deposit the deposit amount of lend NFT
   * @param dailyPrice the daily price of renting NFT
   * @param paymentCycle payment cycle for renting NFT
   * @param minRentalDays min rental days of current NFT (Min suuport value: 1)
   * @param maxRentalDays max rental days of current NFT (Max support value: 65535)
   */
  async lendNFT(
    nftAddress: string,
    tokenId: number,
    erc20Address: string,
    whitelist: string,
    deposit: BigNumber,
    dailyPrice: BigNumber,
    paymentCycle: number,
    minRentalDays: number,
    maxRentalDays: number,
  ) {
    try {
      const tx = await this.#RenteroMarket.lend(
        nftAddress,
        tokenId,
        erc20Address,
        whitelist,
        deposit,
        dailyPrice,
        paymentCycle,
        minRentalDays,
        maxRentalDays
      )
      const result = await tx.wait()
      return result
    } catch (error: any) {
      return error?.error || error;
    }
  }

  /**
   * update lend NFT info, relend to market. (Can only be called when listing not rented)
   * @param nftAddress lend NFT Collection address
   * @param tokenId NFT token id
   * @param erc20Address payment token contract address
   * @param whitelist whitelist address, only support one whitelist address, if don't need whitelist, please pass zero address: 0x0000000000000000000000000000000000000000
   * @param deposit the deposit amount of lend NFT
   * @param dailyPrice the daily price of renting NFT
   * @param paymentCycle payment cycle for renting NFT
   * @param minRentalDays min rental days of current NFT (Min suuport value: 1)
   * @param maxRentalDays max rental days of current NFT (Max support value: 65535)
   */
  async reLendNFT(
    nftAddress: string,
    tokenId: number,
    erc20Address: string,
    whitelist: string,
    deposit: BigNumber,
    dailyPrice: BigNumber,
    paymentCycle: number,
    minRentalDays: number,
    maxRentalDays: number,
  ) {
    try {
      const tx = await this.#RenteroMarket.reLend(
        nftAddress,
        tokenId,
        erc20Address,
        whitelist,
        deposit,
        dailyPrice,
        paymentCycle,
        minRentalDays,
        maxRentalDays
      )
      const result = await tx.wait()
      return result
    } catch (error: any) {
      return error?.error || error;
    }
  }

  /**
   * rent NFT 
   * @param contractAddress NFT contract address
   * @param tokenId NFT token ID
   * @param rentDays rent days (Min:1 ~ Max:65535)
   */
  async rentNFT(contractAddress: string, tokenId: number, rentDays: number) {
    try {
      const tx = await this.#RenteroMarket.rent(contractAddress, tokenId, rentDays)
      const result = await tx.wait()
      return result
    } catch (error: any) {
      return error?.error || error;
    }
  }

  /**
   * renter early return NFT
   * @param contractAddress NFT contract address
   * @param tokenId NFT token id
   */
  async earlyReturn(contractAddress: string, tokenId: number) {
    try {
      const tx = await this.#RenteroMarket.abort(contractAddress, tokenId)
      const result = await tx.wait()
      return result
    } catch (error: any) {
      return error?.error || error;
    }
  }

  /**
   * lender early redeem NFT
   * @param contractAddress NFT contract address
   * @param tokenId NFT token ID
   */
  async redeemNFT(contractAddress: string, tokenId: number) {
    try {
      const tx = await this.#RenteroMarket.reclaim(contractAddress, tokenId)
      const result = await tx.wait()
      return result
    } catch (error: any) {
      return error?.error || error;
    }
  }
}
