import { RenteroNFT } from '../src/index'

const main = async () => {
  const contractAddress = '0x317caEc5AFd5d43B205683318eC35ed8B063d131'

  const renterAddress = '0x431b4ca18e269fc7e1f5af49b9f4e2af683f6207'
  const lenderAddress = '0x576687d59d191A9B20110FB3e126Dbf27D8E42e0'

  const renteroNFT = new RenteroNFT("bsctestnet", [contractAddress])

  const result1 = await renteroNFT.getRentNFTsByAddress(renterAddress)
  console.log(result1)

  const result2 = await renteroNFT.getRentInfoById("0x317caEc5AFd5d43B205683318eC35ed8B063d131", 572)
  console.log(result2)

  const result3 = await renteroNFT.getLendNFTsByAddress(lenderAddress)
  console.log(result3)

  const result4 = await renteroNFT.getAllNFTsInMarket()
  console.log(result4)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });