import { SUPPORT_NETWORK } from './constants';
export default class RenteroNFT {
    #private;
    constructor(network: SUPPORT_NETWORK, targetContracts: string[]);
    getRentNFTsByAddress(renterAddress: string): Promise<any>;
    getRentInfoById(contractAddress: string, tokenId: number): Promise<any>;
    getLendNFTsByAddress(lendAddress: string): Promise<any>;
    getAllNFTsInMarket(): Promise<any>;
}
