# Rentero-SDK-JS

JS SDK For Integrating Rentero Protocol, allowing application developers easily query renter's NFTs info and use Rentero Protocol.

## Installation

```bash
yarn add @rentero/sdk-js
```

## Getting Started

```ts
import { RenteroNFT } from '@rentero/sdk-js'

const contractAddress = '0x80b4a4da97d676ee139bada2bf757b7f5afd0644'
const renterAddress = '0x431b4ca18e269fc7e1f5af49b9f4e2af683f6207'

const renteroNFT = new RenteroNFT('ropsten', [contractAddress])

const result1 = await renteroNFT.getRentNFTsByAddress(renterAddress)
console.log(result1)

const result2 = await renteroNFT.getRentInfoById(contractAddress, 1)
console.log(result2)
```

## Usage

### `RenteroNFT`
Pass in the blockchain network and NFT contracts, instantiate the object

```ts
new RenteroNFT(network: SUPPORT_NETWORK, targetContracts: string[])
```

### `getRentNFTsByAddress`

Query all lease NFTs under the renter address

```ts
const getRentNFTsByAddress: (
  renterAddress: string
) => Promise<any>
```

### `getRentInfoById`

Query the rent NFT info of the specified NFT

```ts
const getRentInfoById: (
  contractAddress: string,
  nftId: number
) => Promise<any>
```
