
import { Rentero } from '@rentero/sdk-js'
import { BigNumber, ethers } from 'ethers'
import { useMemo } from 'react'
import { useSigner } from 'wagmi'

const SHIP_ADDRESS = '0x317caEc5AFd5d43B205683318eC35ed8B063d131'
const HERO_ADDRESS = '0x6fe2BD1C050F439705EcBf98130D7C9C784bbFd6'

export default function RenteroExample() {
  const { data: signer } = useSigner()

  const rentero = useMemo(() => {
    if (!signer) return

    return new Rentero(signer, { targetChain: 'bsctestnet', renteroType: 'installment' })
  }, [signer])

  const handleRentNFT = async () => {
    const TOKEN_ID = 573
    try {
      const result = await rentero?.rentNFT(SHIP_ADDRESS, TOKEN_ID, 3)
      console.log(result)
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleEarlyRetrun = async () => {
    const TOKEN_ID = 573
    const result = await rentero?.earlyReturn(SHIP_ADDRESS, TOKEN_ID)
    console.log(result)
  }

  const handleReclaim = async () => {
    const TOKEN_ID = 573
    const result = await rentero?.redeemNFT(SHIP_ADDRESS, TOKEN_ID)
    console.log(result)
  }

  const handleLendNFT = async () => {
    const result = await rentero?.lendNFT(
      SHIP_ADDRESS,
      573,
      '0x304af20ef7a8497aeed4a4a6ba4601988d5b11f6',
      "0x0000000000000000000000000000000000000000",
      ethers.utils.parseUnits("1.2", 18),
      ethers.utils.parseUnits("1.2", 18),
      3,
      1,
      365
    )
    console.log(result)
  }

  const handleUpdateLendNFT = async () => {
    const result = await rentero?.reLendNFT(
      SHIP_ADDRESS,
      573,
      '0x304af20ef7a8497aeed4a4a6ba4601988d5b11f6',
      "0x0000000000000000000000000000000000000000",
      ethers.utils.parseUnits("2.3", 18),
      ethers.utils.parseUnits("2.3", 18),
      3,
      1,
      365
    )
    console.log(result)
  }

  return <section>
    <button onClick={handleRentNFT}>Rent NFT</button>
    <button onClick={handleEarlyRetrun}>Early Return NFT</button>
    <button onClick={handleReclaim}>Redeem NFT</button>
    <button onClick={handleLendNFT}>Lend NFT</button>
    <button onClick={handleUpdateLendNFT}>Update Lend Order</button>
  </section>
}

// *********************************************************************************
// result format example
// *********************************************************************************
// {
//   "to": "0x4912C81659d6929B180AA828d4FBC58290C78833",
//   "from": "0x431B4CA18E269Fc7e1F5AF49B9F4E2AF683f6207",
//   "contractAddress": null,
//   "transactionIndex": 4,
//   "gasUsed": {
//     "_hex": "0x035d83",
//     "_isBigNumber": true
//   },
//   "logsBloom": "0x00000000000000000000000001000000000000000000000000000000000000000000000000100000000000a00000000000000000000000000000000000000000000000000000000000000008002000001400000000000000000000000000000000800000000008000000200000020000000400000002000200010010000000000000000000000080000000000000000000000000000000000040080000000000000000200000100000000000000000000000000000020000000000000000000000000022000000000000000000010000000000000000000000000000000000020000000002800000000000000040000000000020000000000000000000001800",
//   "blockHash": "0x2e97141034b3b429222109ea45620d92ae6639c32b410461023c857a4d718e99",
//   "transactionHash": "0xb4c32ee210bdc50bfbfd93dc13c143cba1ff391322b6e913c10e0fe8f48719f1",
//   "logs": [
//     {
//       "transactionIndex": 4,
//       "blockNumber": 22849148,
//       "transactionHash": "0xb4c32ee210bdc50bfbfd93dc13c143cba1ff391322b6e913c10e0fe8f48719f1",
//       "address": "0x304af20eF7a8497aEED4a4a6bA4601988d5b11F6",
//       "topics": [
//         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//         "0x000000000000000000000000431b4ca18e269fc7e1f5af49b9f4e2af683f6207",
//         "0x000000000000000000000000576687d59d191a9b20110fb3e126dbf27d8e42e0"
//       ],
//       "data": "0x00000000000000000000000000000000000000000000000059ed95aae0880000",
//       "logIndex": 4,
//       "blockHash": "0x2e97141034b3b429222109ea45620d92ae6639c32b410461023c857a4d718e99"
//     },
//     {
//       "transactionIndex": 4,
//       "blockNumber": 22849148,
//       "transactionHash": "0xb4c32ee210bdc50bfbfd93dc13c143cba1ff391322b6e913c10e0fe8f48719f1",
//       "address": "0x304af20eF7a8497aEED4a4a6bA4601988d5b11F6",
//       "topics": [
//         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//         "0x000000000000000000000000431b4ca18e269fc7e1f5af49b9f4e2af683f6207",
//         "0x0000000000000000000000003ae9a08ed63bbd5e0f31e2b184e6136027eaf0c0"
//       ],
//       "data": "0x00000000000000000000000000000000000000000000000009fdf42f6e480000",
//       "logIndex": 5,
//       "blockHash": "0x2e97141034b3b429222109ea45620d92ae6639c32b410461023c857a4d718e99"
//     },
//     {
//       "transactionIndex": 4,
//       "blockNumber": 22849148,
//       "transactionHash": "0xb4c32ee210bdc50bfbfd93dc13c143cba1ff391322b6e913c10e0fe8f48719f1",
//       "address": "0x197faDc42067F43A32DAD11C53962edE0C83e0aB",
//       "topics": [
//         "0x4e06b4e7000e659094299b3533b47b6aa8ad048e95e872d23d1f4ee55af89cfe",
//         "0x000000000000000000000000000000000000000000000000000000000000023d",
//         "0x000000000000000000000000431b4ca18e269fc7e1f5af49b9f4e2af683f6207"
//       ],
//       "data": "0x0000000000000000000000000000000000000000000000000000000063267898",
//       "logIndex": 6,
//       "blockHash": "0x2e97141034b3b429222109ea45620d92ae6639c32b410461023c857a4d718e99"
//     },
//     {
//       "transactionIndex": 4,
//       "blockNumber": 22849148,
//       "transactionHash": "0xb4c32ee210bdc50bfbfd93dc13c143cba1ff391322b6e913c10e0fe8f48719f1",
//       "address": "0x4912C81659d6929B180AA828d4FBC58290C78833",
//       "topics": [
//         "0xcf944595faad0b2f0ee81421259b70f338541134447ecb3dd3573764b2d69c0b",
//         "0x000000000000000000000000317caec5afd5d43b205683318ec35ed8b063d131",
//         "0x000000000000000000000000000000000000000000000000000000000000023d",
//         "0x000000000000000000000000431b4ca18e269fc7e1f5af49b9f4e2af683f6207"
//       ],
//       "data": "0x000000000000000000000000576687d59d191a9b20110fb3e126dbf27d8e42e000000000000000000000000000000000000000000000000000000000632678980000000000000000000000000000000000000000000000000000000063267898",
//       "logIndex": 7,
//       "blockHash": "0x2e97141034b3b429222109ea45620d92ae6639c32b410461023c857a4d718e99"
//     }
//   ],
//   "blockNumber": 22849148,
//   "confirmations": 5,
//   "cumulativeGasUsed": {
//     "_hex": "0x07b1dc",
//     "_isBigNumber": true
//   },
//   "effectiveGasPrice": {
//     "_hex": "0x046c7cfe00",
//     "_isBigNumber": true
//   },
//   "status": 1,
//   "type": 0,
//   "byzantium": true,
//   "events": [
//     {
//       "transactionIndex": 4,
//       "blockNumber": 22849148,
//       "transactionHash": "0xb4c32ee210bdc50bfbfd93dc13c143cba1ff391322b6e913c10e0fe8f48719f1",
//       "address": "0x304af20eF7a8497aEED4a4a6bA4601988d5b11F6",
//       "topics": [
//         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//         "0x000000000000000000000000431b4ca18e269fc7e1f5af49b9f4e2af683f6207",
//         "0x000000000000000000000000576687d59d191a9b20110fb3e126dbf27d8e42e0"
//       ],
//       "data": "0x00000000000000000000000000000000000000000000000059ed95aae0880000",
//       "logIndex": 4,
//       "blockHash": "0x2e97141034b3b429222109ea45620d92ae6639c32b410461023c857a4d718e99"
//     },
//     {
//       "transactionIndex": 4,
//       "blockNumber": 22849148,
//       "transactionHash": "0xb4c32ee210bdc50bfbfd93dc13c143cba1ff391322b6e913c10e0fe8f48719f1",
//       "address": "0x304af20eF7a8497aEED4a4a6bA4601988d5b11F6",
//       "topics": [
//         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//         "0x000000000000000000000000431b4ca18e269fc7e1f5af49b9f4e2af683f6207",
//         "0x0000000000000000000000003ae9a08ed63bbd5e0f31e2b184e6136027eaf0c0"
//       ],
//       "data": "0x00000000000000000000000000000000000000000000000009fdf42f6e480000",
//       "logIndex": 5,
//       "blockHash": "0x2e97141034b3b429222109ea45620d92ae6639c32b410461023c857a4d718e99"
//     },
//     {
//       "transactionIndex": 4,
//       "blockNumber": 22849148,
//       "transactionHash": "0xb4c32ee210bdc50bfbfd93dc13c143cba1ff391322b6e913c10e0fe8f48719f1",
//       "address": "0x197faDc42067F43A32DAD11C53962edE0C83e0aB",
//       "topics": [
//         "0x4e06b4e7000e659094299b3533b47b6aa8ad048e95e872d23d1f4ee55af89cfe",
//         "0x000000000000000000000000000000000000000000000000000000000000023d",
//         "0x000000000000000000000000431b4ca18e269fc7e1f5af49b9f4e2af683f6207"
//       ],
//       "data": "0x0000000000000000000000000000000000000000000000000000000063267898",
//       "logIndex": 6,
//       "blockHash": "0x2e97141034b3b429222109ea45620d92ae6639c32b410461023c857a4d718e99"
//     },
//     {
//       "transactionIndex": 4,
//       "blockNumber": 22849148,
//       "transactionHash": "0xb4c32ee210bdc50bfbfd93dc13c143cba1ff391322b6e913c10e0fe8f48719f1",
//       "address": "0x4912C81659d6929B180AA828d4FBC58290C78833",
//       "topics": [
//         "0xcf944595faad0b2f0ee81421259b70f338541134447ecb3dd3573764b2d69c0b",
//         "0x000000000000000000000000317caec5afd5d43b205683318ec35ed8b063d131",
//         "0x000000000000000000000000000000000000000000000000000000000000023d",
//         "0x000000000000000000000000431b4ca18e269fc7e1f5af49b9f4e2af683f6207"
//       ],
//       "data": "0x000000000000000000000000576687d59d191a9b20110fb3e126dbf27d8e42e000000000000000000000000000000000000000000000000000000000632678980000000000000000000000000000000000000000000000000000000063267898",
//       "logIndex": 7,
//       "blockHash": "0x2e97141034b3b429222109ea45620d92ae6639c32b410461023c857a4d718e99",
//       "args": [
//         "0x317caEc5AFd5d43B205683318eC35ed8B063d131",
//         {
//           "_hex": "0x023d",
//           "_isBigNumber": true
//         },
//         "0x576687d59d191A9B20110FB3e126Dbf27D8E42e0",
//         "0x431B4CA18E269Fc7e1F5AF49B9F4E2AF683f6207",
//         {
//           "_hex": "0x63267898",
//           "_isBigNumber": true
//         },
//         {
//           "_hex": "0x63267898",
//           "_isBigNumber": true
//         }
//       ],
//       "event": "Rent",
//       "eventSignature": "Rent(address,uint256,address,address,uint256,uint256)"
//     }
//   ]
// }