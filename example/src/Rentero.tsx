
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
    const TOKEN_ID = 574
    try {
      const result = await rentero?.rentNFT(SHIP_ADDRESS, TOKEN_ID, 3)
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleEarlyRetrun = async () => {
    const TOKEN_ID = 575
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
      ethers.utils.parseUnits("2.4", 18),
      ethers.utils.parseUnits("2.4", 18),
      5,
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