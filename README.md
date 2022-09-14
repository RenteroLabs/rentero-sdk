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

const renteroNFT = new RenteroNFT('bsctestnet', [contractAddress])

const result1 = await renteroNFT.getRentNFTsByAddress(renterAddress)

const result2 = await renteroNFT.getRentInfoById(
  '0x317caEc5AFd5d43B205683318eC35ed8B063d131',
  572
)

const result3 = await renteroNFT.getLendNFTsByAddress(lenderAddress)

const result4 = await renteroNFT.getAllNFTsInMarket()
```

## APIs

Rentero SDK mainly divide into two part: `RenteroNFT` and `Rentero`.

- `RenteroNFT` class contains query rental NFT info from thegraph data, such as expires time, renting NFTs, lending NFTs, etc.

- `Rentero` class contains Rentero Protocol core functions, such as lending、rending、redemption.

---

### 1. **_RenteroNFT_**

Pass in the blockchain network and NFT contracts, instantiate the object

```TypeScript
new RenteroNFT(network: SUPPORT_NETWORK, targetContracts: string[])
```

### 1.1 `getRentNFTsByAddress`

Query all lease NFTs under the renter address

```TypeScript
const getRentNFTsByAddress: ( renterAddress: string) => Promise<any>
```

### 1.2 `getRentInfoById`

Query the rent NFT info of the specified NFT

```TypeScript
const getRentInfoById: (contractAddress: string, nftId: number) => Promise<any>
```

Example result:

```json
{
  "lease": {
    "renter": "0x0000000000000000000000000000000000000000",
    "lender": "0x576687d59d191a9b20110fb3e126dbf27d8e42e0",
    "expires": "0"
  }
}
```

_TIP:_ **If the expires time is greater than the current time, it is in the rental state, otherwise it is in the market listing state.**

### 1.3 `getLendNFTsByAddress`

Query lend NFTs list by lender address

```TypeScript
const getLendNFTsByAddress: (lendAddress: string) => Promise<any>
```

### 1.4 `getAllNFTsInMarket`

Query all NFTs in Rentero Market by the passed NFT Collections

---

### 2 **_Rentero_**

Rentero class contains Rentero protocol core functions, user could lend、rent、redeem、return, etc by Rentero instance.

`new Rentero(signer, config)`

**Params**

- signer: `ethers.Signer`
  - sign messages and transactions and send signed transactions to network to execute state changing operations. [more details](https://docs.ethers.io/v5/api/signer/)
- renteroConfig: `{targetChain: SUPPORT_NETWORK, renteroType: RENTERO_MODE, marketAddress?: string}`
  - targetChain: current support chain `'mainnet' | 'rinkeby' | 'bsc' | 'bsctestnet'`
  - renteroType: current only support `installment`
  - marketAddress _(optional)_: specify market contract address to override the above configuration

```typescript
// example used in dapp
const { data: signer } = useSigner()

const rentero = useMemo(() => {
  if (!signer) return

  return new Rentero(signer, {
    targetChain: 'bsctestnet',
    renteroType: 'installment',
  })
}, [signer])
```

full usage example see [demo](./example/src/Rentero.tsx)

### 2.1 `lendNFT`

lend user NFT to market

```typescript
Rentero.lendNFT(nftAddress: string, tokenId: number, erc20Address: string, whitelist: string, deposit: BigNumber, dailyPrice: BigNumber, paymentCycle: number, minRentalDays: number, maxRentalDays: number) => Promise<any>
```

**Params**

- nftAddress: `string`
  - lend NFT Collection address
- tokenId: `number`
  - NFT token id
- erc20Address: `string`
  - payment token contract address
- whitelist: `string`
  - whitelist address, only whitelist user could rent this NFT, only support one whitelist address, if don't need whitelist, please pass zero address: `0x0000000000000000000000000000000000000000`
- deposit: `ethers.BigNumber`
  - the deposit amount of lend NFT
- dailyPrice: `ethers.BigNumber`
  - the daily price of renting NFT
- paymentCycle: `number`
  - payment cycle for renting NFT
- minRentalDays: `number`
  - min rental days of current NFT (Min suuport value: 1)
- maxRentalDays: `number`
  - max rental days of current NFT (Max support value: 65535)

```typescript
const result = await rentero?.lendNFT(
  SHIP_ADDRESS,
  573,
  '0x304af20ef7a8497aeed4a4a6ba4601988d5b11f6',
  '0x0000000000000000000000000000000000000000',
  ethers.utils.parseUnits('1.2', 18),
  ethers.utils.parseUnits('1.2', 18),
  3,
  1,
  365
)
console.log(result)
```

### 2.2 `reLendNFT`

update lend NFT order info in market. (Can only be called when listing not rented)

```typescript
Rentero.reLendNFT(nftAddress: string, tokenId: number, erc20Address: string, whitelist: string, deposit: BigNumber, dailyPrice: BigNumber, paymentCycle: number, minRentalDays: number, maxRentalDays: number) => Promise<any>
```

**Params**

Same to `lendNFT` params

```typescript
const result = await rentero?.reLendNFT(
  SHIP_ADDRESS,
  573,
  '0x304af20ef7a8497aeed4a4a6ba4601988d5b11f6',
  '0x0000000000000000000000000000000000000000',
  ethers.utils.parseUnits('2.4', 18),
  ethers.utils.parseUnits('2.4', 18),
  5,
  1,
  365
)
console.log(result)
```

### 2.3 `rentNFT`

rent NFT in market

```typescript
Rentero.rentNFT(contractAddress: string, tokenId: number, rentDays: number) => Promise<any>
```

**Params**

- contractAddress: `string`
  - NFT contract address
- tokenId: `string`
  - NFT token ID
- rentDays: `number`
  - rent days (Min:1 ~ Max:65535)

```typescript
const SHIP_ADDRESS = '0x317caEc5AFd5d43B205683318eC35ed8B063d131'
const TOKEN_ID = 574
const result = await rentero?.rentNFT(SHIP_ADDRESS, TOKEN_ID, 10)
console.log(result)
```

### 2.4 `earlyReturn`

renter early return rented NFT

```typescript
Rentero.earlyReturn(contractAddress: string, tokenId: number) => Promise<any>
```

**Params**

- contractAddress: `string`
  - NFT contract address
- tokenId: `string`
  - NFT token ID

```typescript
const SHIP_ADDRESS = '0x317caEc5AFd5d43B205683318eC35ed8B063d131'
const TOKEN_ID = 575
const result = await rentero?.earlyReturn(SHIP_ADDRESS, TOKEN_ID)
console.log(result)
```

### 2.5 `redeemNFT`

lender early redeem NFT

```typescript
Rentero.redeemNFT(contractAddress: string, tokenId: number) => Promise<any>
```

**Params**

- contractAddress: `string`
  - NFT contract address
- tokenId: `string`
  - NFT token ID

```typescript
const SHIP_ADDRESS = '0x317caEc5AFd5d43B205683318eC35ed8B063d131'
const TOKEN_ID = 573
const result = await rentero?.redeemNFT(SHIP_ADDRESS, TOKEN_ID)
console.log(result)
```