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
    this.#targetContracts = targetContracts
    this.#graphpath = NETWORK_GRAPHS[network]
  }

  /**
   * Query all lease NFTs under the renter address
   * @param renterAddress 
   */
  async getRentNFTsByAddress(renterAddress: string) {
    const query = gql`
      query getRentNFTs($renter: String!, $contracts: [String!]) {
        leases(where: { renter: $renter, nftAddress_in: $contracts}) {
          tokenId
          nftAddress
          lender
          expires
        }
      }
    `
    const variables = {
      renter: renterAddress,
      contracts: this.#targetContracts
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
      id: [contractAddress, tokenId].join('-')
    }
    return await request(this.#graphpath, query, variables)
  }
}
