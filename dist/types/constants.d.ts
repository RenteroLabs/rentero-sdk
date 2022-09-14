export declare type SUPPORT_NETWORK = 'mainnet' | 'rinkeby' | 'bsc' | 'bsctestnet';
export declare const NETWORK_GRAPHS: Record<SUPPORT_NETWORK, string>;
export declare type RENTERO_MODE = 'installment';
export declare const DEFAULT_MARKET_ADDRESS: Record<string, string>;
export declare const MARKET_ABI: ({
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    outputs?: undefined;
    stateMutability?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
