# Rentero-SDK-JS

| :exclamation: The package is in development and breaking changes should be expected. Use at your own risk! |
| :--------------------------------------------------------------------------------------------------------- |

JS SDK For Integrating Rentero Protocol, allowing application developers easily query renter's NFTs info.

## Installation

```bash
yarn add @rentero/sdk-js
```

## Getting Start

```ts
import { Rentero } from '@rentero/sdk-js'

const provider = new ethers.providers.JsonRpcProvider(<RPC_URL>)
const contractAddress = '0x5A6E1d2d40c85dB942246Ad7cf1025b380FfcC40'
const renterAddress = '0x576687d59d191A9B20110FB3e126Dbf27D8E42e0'

const rentList =  await Rentero.getRentNFTsByAddress(provider, contractAddress, renterAddress)
console.log("Renter's NFT list", rentList)
```

## Usage

### `getRentNFTsByAddress`

Query all lease NFTs under the renter address

```ts
const getRentNFTsByAddress: (
  provider: providers.Provider,
  contractAddress: string,
  renterAddress: string
) => Promise<any[]>
```

### `getRenterAddressById`

Query the renter of the specified NFT

```ts
const getRenterAddressById: (
  provider: providers.Provider,
  contractAddress: string,
  nftId: number
) => Promise<string>
```

### `getNFTOwnerById`

Query the owner of the original NFT

```ts
const getNFTOwnerById: (
  provider: providers.Provider,
  contractAddress: string,
  nftId: number
) => Promise<string>
```

### `getOriginalContractAddress`

Query the original NFT contract address

```ts
const getOriginalContractAddress: (
  provider: providers.Provider,
  contractAddress: string
) => Promise<string>
```
