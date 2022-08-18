import { RenteroNFT } from '../src/index'

const main = async () => {
  const contractAddress = '0x80b4a4da97d676ee139bada2bf757b7f5afd0644'
  const renterAddress = '0x431b4ca18e269fc7e1f5af49b9f4e2af683f6207'

  const renteroNFT = new RenteroNFT('ropsten', [contractAddress])

  const result1 = await renteroNFT.getRentNFTsByAddress(renterAddress)
  console.log(result1)

  const result2 = await renteroNFT.getRentInfoById("0x80b4a4da97d676ee139bada2bf757b7f5afd0644", 1)
  console.log(result2)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });