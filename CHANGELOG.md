# Changelog

### **v0.0.8**

- ✨ feat(api):  add `getRentNFTsByAddress` 、`getRenterAddressById` 、`getNFTOwnerById` and `getOriginalContractAddress` four api functions
- 📚 test: basic test for four api function
- ✅ docs: api usage introduction in readme

### **v0.0.9**

- ✨ feat(api): design `Rentero`、`RenteroNFT` class, remove `getNFTOwnerById` and `getOriginalContractAddress` api function
- refactor: query rent NFT info from thegraph data
- ✅ docs: update readme introduce and useage

### **v0.0.10**
- ✨ feat(api): add `getLendNFTsByAddress` and `getAllNFTsInMarket` functions in RenteroNFT class
- refactor: support chains includes `'mainnet' | 'rinkeby' | 'bsc' | 'bsctestnet'`


### **v0.0.11**
- ✨ feat(api): add `Rentero` class, include `lendNFT`, `reLendNFT`, `rentNFT`, `earlyReturn`, `redeemNFT` five functions
- ✅ docs: add Rentero class usage introduction


### **v0.0.12**
- ✨ feat(api): add bsc-test market contract



### **v0.0.13**
- ✨ chore(thegraph): use goerli thegraph service instend of ropsten thegraph service

