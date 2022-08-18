import { ethers } from 'ethers'
import { RenteroNFT } from '../src/index'
require("dotenv").config();

const main = async () => {
  const providerUrl = `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`

  const provider = new ethers.providers.JsonRpcProvider(providerUrl)
  const contractAddress = '0x5A6E1d2d40c85dB942246Ad7cf1025b380FfcC40'
  const renterAddress = '0x576687d59d191A9B20110FB3e126Dbf27D8E42e0'

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });