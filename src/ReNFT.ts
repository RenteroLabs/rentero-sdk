import { providers, ethers } from 'ethers'
import { WRAPNFT_ABI } from './constants'

/**
 * Query all lease NFTs under the renter address
 * @param provider ethers provider
 * @param contractAddress target contract address
 * @param renterAddress renter address
 */
export const getRentNFTsByAddress = async (
  provider: providers.Provider,
  contractAddress: string,
  renterAddress: string) => {

  const contract = new ethers.Contract(contractAddress, WRAPNFT_ABI, provider)
  const data = await contract.tokenListOf(renterAddress)

  return data as any[]
}

/**
 * Query the renter of the specified NFT
 * @param provider ethers provider
 * @param contractAddress target contract address
 * @param nftId 
 */
export const getRenterAddressById = async (
  provider: providers.Provider,
  contractAddress: string,
  nftId: number) => {

  const contract = new ethers.Contract(contractAddress, WRAPNFT_ABI, provider)
  const data = await contract.borrowerOf(nftId)

  return data as string
}

/**
 * Query the owner of the original NFT
 * @param provider ethers provider
 * @param contractAddress target contract address
 * @param nftId 
 * @returns 
 */
export const getNFTOwnerById = async (
  provider: providers.Provider,
  contractAddress: string,
  nftId: number
) => {
  const contract = new ethers.Contract(contractAddress, WRAPNFT_ABI, provider)
  const data = await contract.originalOwnerOf(nftId)

  return data as string
}

/**
 * Query the original NFT contract address
 * @param provider ethers provider
 * @param contractAddress target contract address
 */
export const getOriginalContractAddress = async (
  provider: providers.Provider,
  contractAddress: string
) => {
  const contract = new ethers.Contract(contractAddress, WRAPNFT_ABI, provider)
  const data = await contract.originalAddress()

  return data as string
}