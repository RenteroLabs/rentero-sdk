import { ethers } from 'ethers'
import { Rentero } from '../src/index'
require("dotenv").config();

const main = async () => {
  const providerUrl = `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`

  const provider = new ethers.providers.JsonRpcProvider(providerUrl)
  const contractAddress = '0x5A6E1d2d40c85dB942246Ad7cf1025b380FfcC40'
  const renterAddress = '0x576687d59d191A9B20110FB3e126Dbf27D8E42e0'

  const result1 = await Rentero.getRentNFTsByAddress(provider, contractAddress, renterAddress)
  console.log(result1)

  const result2 = await Rentero.getRenterAddressById(provider, contractAddress, 8)
  console.log(result2)

  const result3 = await Rentero.getNFTOwnerById(provider, contractAddress, 8)
  console.log(result3)

  const result4 = await Rentero.getOriginalContractAddress(provider, contractAddress)
  console.log(result4)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });