import { providers } from 'ethers';
export declare const getRentNFTsByAddress: (provider: providers.Provider, contractAddress: string, renterAddress: string) => Promise<any[]>;
export declare const getRenterAddressById: (provider: providers.Provider, contractAddress: string, nftId: number) => Promise<string>;
export declare const getNFTOwnerById: (provider: providers.Provider, contractAddress: string, nftId: number) => Promise<string>;
export declare const getOriginalContractAddress: (provider: providers.Provider, contractAddress: string) => Promise<string>;
