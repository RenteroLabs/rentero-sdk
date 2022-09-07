# Rentero-SDK-JS

JS SDK For Integrating Rentero Protocol, allowing application developers easily query renter's NFTs info and use Rentero Protocol.

## Installation

```bash
yarn add @rentero/sdk-js
```

## Usage

SDK currently supports chains includes: `'mainnet' | 'rinkeby' | 'bsc' | 'bsctestnet'`

```ts
import { RenteroNFT, Rentero } from '@rentero/sdk-js'

const contractAddress = '0x317caEc5AFd5d43B205683318eC35ed8B063d131'

const renterAddress = '0x431b4ca18e269fc7e1f5af49b9f4e2af683f6207'
const lenderAddress = '0x576687d59d191A9B20110FB3e126Dbf27D8E42e0'

const renteroNFT = new RenteroNFT("bsctestnet", [contractAddress])

const result1 = await renteroNFT.getRentNFTsByAddress(renterAddress)

const result2 = await renteroNFT.getRentInfoById("0x317caEc5AFd5d43B205683318eC35ed8B063d131", 572)

const result3 = await renteroNFT.getLendNFTsByAddress(lenderAddress)

const result4 = await renteroNFT.getAllNFTsInMarket()
```


## APIs

Rentero SDK mainly divide into two part: `RenteroNFT` and `Rentero`. 

+ `RenteroNFT` class contains query rental NFT info from thegraph data, such as expires time, renting NFTs, lending NFTs, etc.

+ `Rentero` class contains Rentero Protocol core functions, such as lending、rending、redemption.

---
### 1. ***RenteroNFT***
Pass in the blockchain network and NFT contracts, instantiate the object

```ts
new RenteroNFT(network: SUPPORT_NETWORK, targetContracts: string[])
```

### 1.1 `getRentNFTsByAddress`

Query all lease NFTs under the renter address

```ts
const getRentNFTsByAddress: ( renterAddress: string) => Promise<any> 
```

### 1.2 `getRentInfoById`

Query the rent NFT info of the specified NFT

```ts
const getRentInfoById: (contractAddress: string, nftId: number) => Promise<any>
```

Example result:
```json
{
  lease: {
    renter: '0x0000000000000000000000000000000000000000',
    lender: '0x576687d59d191a9b20110fb3e126dbf27d8e42e0',
    expires: '0'
  }
}
```
*TIP:* **If the expires time is greater than the current time, it is in the rental state, otherwise it is in the market listing state.**

### 1.3 `getLendNFTsByAddress`

Query lend NFTs list by lender address

```ts
const getLendNFTsByAddress: (lendAddress: string) => Promise<any>
```

### 1.4 `getAllNFTsInMarket`

Query all NFTs in Rentero Market by the passed NFT Collections

---

### 2 ***Rentero***

*WIP: coming soon!*