import { request, gql } from 'graphql-request'
import { NETWORK_GRAPHS, SUPPORT_NETWORK } from './constants'

export default class RenteroNFT {
  #targetContracts: string[]
  #graphpath: string

  /**
   * Pass in the blockchain network and NFT contracts, instantiate the object
   * @param network 
   * @param targetContract 
   */
  constructor(network: SUPPORT_NETWORK, targetContracts: string[]) {
    this.#targetContracts = targetContracts.map(item => item.toLowerCase())
    this.#graphpath = NETWORK_GRAPHS[network]
  }

  /**
   * Query all lease NFTs under the renter address
   * @param renterAddress 
   */
  async getRentNFTsByAddress(renterAddress: string) {
    const timestamp = (new Date().getTime() / 1000).toFixed()
    const query = gql`
      query getRentNFTs($renter: String!, $contracts: [String!], $timestamp: String!) {
        leases(where: { 
          renter: $renter, 
          nftAddress_in: $contracts, 
          expires_gt: $timestamp ,
          }) {
          tokenId
          nftAddress
          lender
          expires
        }
      }
    `
    const variables = {
      renter: renterAddress.toLowerCase(),
      contracts: this.#targetContracts,
      timestamp: timestamp
    }
    return await request(this.#graphpath, query, variables)
  }

  /**
   * Query rent NFT info
   * @param contractAddress 
   * @param tokenId 
   */
  async getRentInfoById(contractAddress: string, tokenId: number) {
    const query = gql`
      query getRenterAddress($id: String!) {
        lease(id: $id) {
          renter
          lender
          expires
        }
      }
    `
    const variables = {
      id: [contractAddress.toLowerCase(), tokenId].join('-')
    }
    return await request(this.#graphpath, query, variables)
  }

  /**
   * Query lend NFT list by lender address
   * @param lendAddress 
   * @returns 
   */
  async getLendNFTsByAddress(lendAddress: string) {
    const query = gql`
      query getLendNFTs($lender: String!, $contracts: [String!]) {
        leases(where: {
          lender: $lender, 
          nftAddress_in: $contracts, 
        }) {
          tokenId
          nftAddress
          lender
          renter
          expires 
        }
      }
    `
    const variables = {
      lender: lendAddress.toLowerCase(),
      contracts: this.#targetContracts,
    }
    return await request(this.#graphpath, query, variables)
  }

  /**
   * Query all NFTs in Rentero Market by the passed NFT Collections
   * @returns 
   */
  async getAllNFTsInMarket() {
    const query = gql`
      query getNFTs($contracts: [String!]) {
        leases(where: {nftAddress_in: $contracts}) {
          tokenId
          nftAddress
          lender
          renter
          expires 
        }
      }
    `
    const variables = {
      contracts: this.#targetContracts,
    } 
    return await request(this.#graphpath, query, variables)
  }
}
