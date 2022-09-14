import { Signer, BigNumber } from 'ethers';
import { RENTERO_MODE, SUPPORT_NETWORK } from './constants';
declare type RenteroConfig = {
    targetChain: SUPPORT_NETWORK;
    renteroType: RENTERO_MODE;
    marketAddress?: string;
};
export default class Rentero {
    #private;
    constructor(signer: Signer, config: RenteroConfig);
    lendNFT(nftAddress: string, tokenId: number, erc20Address: string, whitelist: string, deposit: BigNumber, dailyPrice: BigNumber, paymentCycle: number, minRentalDays: number, maxRentalDays: number): Promise<any>;
    reLendNFT(nftAddress: string, tokenId: number, erc20Address: string, whitelist: string, deposit: BigNumber, dailyPrice: BigNumber, paymentCycle: number, minRentalDays: number, maxRentalDays: number): Promise<any>;
    rentNFT(contractAddress: string, tokenId: number, rentDays: number): Promise<any>;
    earlyReturn(contractAddress: string, tokenId: number): Promise<any>;
    redeemNFT(contractAddress: string, tokenId: number): Promise<any>;
}
export {};
