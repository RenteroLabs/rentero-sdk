'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var graphqlRequest = require('graphql-request');
var ethers = require('ethers');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

const NETWORK_GRAPHS = {
    'mainnet': "",
    "goerli": "https://goerli.rentero.io/subgraphs/name/john-rentero/rentero-market",
    "bsc": "",
    "bsctestnet": "https://bsc-testnet.rentero.io/subgraphs/name/john-rentero/rentero-market",
};
const DEFAULT_MARKET_ADDRESS = {
    "mainnet-installment": "",
    "rinkeby-installment": "0x48430954949396E18ADeBb292e60D1B84782D6bD",
    "goerli-installment": "0x2f4c75EbB3F14453Da1101d777BAb85Fe91fDBdE",
    "bsc-installment": "",
    "bsctestnet-installment": "0xDe2748F8647E1aDBc98d682a1BC2745406c07451",
};
const MARKET_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "renter",
                "type": "address"
            }
        ],
        "name": "Abort",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "renter",
                "type": "address"
            }
        ],
        "name": "ForceReclaim",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "renter",
                "type": "address"
            }
        ],
        "name": "InstallmentFailed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "renter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "paidExpires",
                "type": "uint256"
            }
        ],
        "name": "InstallmentSuccess",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "lender",
                "type": "address"
            }
        ],
        "name": "Lend",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "lender",
                "type": "address"
            }
        ],
        "name": "ReLend",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "lender",
                "type": "address"
            }
        ],
        "name": "Reclaim",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "renter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "paidExpires",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "expires",
                "type": "uint256"
            }
        ],
        "name": "Rent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "renter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "deposit",
                "type": "uint256"
            }
        ],
        "name": "ReturnDeposit",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "abort",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeReceiver",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "nftAddresses",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "tokenIds",
                "type": "uint256[]"
            }
        ],
        "name": "installment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "lease",
        "outputs": [
            {
                "internalType": "address",
                "name": "lender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "erc20Address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "whitelist",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deposit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rentPerDay",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "daysPerPeriod",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minRentalDays",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "maxRentalDays",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "renter",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "paidExpires",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "expires",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "erc20Address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "whitelist",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deposit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rentPerDay",
                "type": "uint256"
            },
            {
                "internalType": "uint16",
                "name": "daysPerPeriod",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "minRentalDays",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "maxRentalDays",
                "type": "uint16"
            }
        ],
        "name": "lend",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "monitor",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "nftAddressToRenteroAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "erc20Address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "whitelist",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deposit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rentPerDay",
                "type": "uint256"
            },
            {
                "internalType": "uint16",
                "name": "daysPerPeriod",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "minRentalDays",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "maxRentalDays",
                "type": "uint16"
            }
        ],
        "name": "reLend",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "reclaim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint16",
                "name": "rentalDays",
                "type": "uint16"
            }
        ],
        "name": "rent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "feeRate_",
                "type": "uint256"
            }
        ],
        "name": "setFeeRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "feeReceiver_",
                "type": "address"
            }
        ],
        "name": "setFeeReceiver",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "monitor_",
                "type": "address"
            }
        ],
        "name": "setMonitor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "renteroAddress",
                "type": "address"
            }
        ],
        "name": "setRenteroAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

var _RenteroNFT_targetContracts, _RenteroNFT_graphpath;
class RenteroNFT {
    constructor(network, targetContracts) {
        _RenteroNFT_targetContracts.set(this, void 0);
        _RenteroNFT_graphpath.set(this, void 0);
        __classPrivateFieldSet(this, _RenteroNFT_targetContracts, targetContracts.map(item => item.toLowerCase()), "f");
        __classPrivateFieldSet(this, _RenteroNFT_graphpath, NETWORK_GRAPHS[network], "f");
    }
    getRentNFTsByAddress(renterAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const timestamp = (new Date().getTime() / 1000).toFixed();
            const query = graphqlRequest.gql `
      query getRentNFTs($renter: String!, $contracts: [String!], $timestamp: String!) {
        leases(where: { 
          renter: $renter, 
          nftAddress_in: $contracts, 
          expires_gt: $timestamp ,
          }) {
            chain
            daysPerPeriod
            deposit
            erc20Address
            expires
            id
            lender
            maxRentalDays
            minRentalDays
            nftAddress
            paidExpires
            rentPerDay
            renter
            start
            tokenId
            whitelist
        }
      }
    `;
            const variables = {
                renter: renterAddress.toLowerCase(),
                contracts: __classPrivateFieldGet(this, _RenteroNFT_targetContracts, "f"),
                timestamp: timestamp
            };
            return yield graphqlRequest.request(__classPrivateFieldGet(this, _RenteroNFT_graphpath, "f"), query, variables);
        });
    }
    getRentInfoById(contractAddress, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = graphqlRequest.gql `
      query getRenterAddress($id: String!) {
        lease(id: $id) {
          chain
          daysPerPeriod
          deposit
          erc20Address
          expires
          id
          lender
          maxRentalDays
          minRentalDays
          nftAddress
          paidExpires
          rentPerDay
          renter
          start
          tokenId
          whitelist
        }
      }
    `;
            const variables = {
                id: [contractAddress.toLowerCase(), tokenId].join('-')
            };
            return yield graphqlRequest.request(__classPrivateFieldGet(this, _RenteroNFT_graphpath, "f"), query, variables);
        });
    }
    getLendNFTsByAddress(lendAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = graphqlRequest.gql `
      query getLendNFTs($lender: String!, $contracts: [String!]) {
        leases(where: {
          lender: $lender, 
          nftAddress_in: $contracts, 
        }) {
          chain
          daysPerPeriod
          deposit
          erc20Address
          expires
          id
          lender
          maxRentalDays
          minRentalDays
          nftAddress
          paidExpires
          rentPerDay
          renter
          start
          tokenId
          whitelist
        }
      }
    `;
            const variables = {
                lender: lendAddress.toLowerCase(),
                contracts: __classPrivateFieldGet(this, _RenteroNFT_targetContracts, "f"),
            };
            return yield graphqlRequest.request(__classPrivateFieldGet(this, _RenteroNFT_graphpath, "f"), query, variables);
        });
    }
    getAllNFTsInMarket() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = graphqlRequest.gql `
      query getNFTs($contracts: [String!]) {
        leases(where: {nftAddress_in: $contracts}) {
          chain
          daysPerPeriod
          deposit
          erc20Address
          expires
          id
          lender
          maxRentalDays
          minRentalDays
          nftAddress
          paidExpires
          rentPerDay
          renter
          start
          tokenId
          whitelist 
        }
      }
    `;
            const variables = {
                contracts: __classPrivateFieldGet(this, _RenteroNFT_targetContracts, "f"),
            };
            return yield graphqlRequest.request(__classPrivateFieldGet(this, _RenteroNFT_graphpath, "f"), query, variables);
        });
    }
}
_RenteroNFT_targetContracts = new WeakMap(), _RenteroNFT_graphpath = new WeakMap();

var _Rentero_RenteroMarket, _Rentero_rentMode, _Rentero_chain;
class Rentero {
    constructor(signer, config) {
        _Rentero_RenteroMarket.set(this, void 0);
        _Rentero_rentMode.set(this, void 0);
        _Rentero_chain.set(this, void 0);
        __classPrivateFieldSet(this, _Rentero_rentMode, config.renteroType, "f");
        __classPrivateFieldSet(this, _Rentero_chain, config.targetChain, "f");
        let marketAddress;
        if (config.marketAddress) {
            marketAddress = config.marketAddress;
        }
        else {
            marketAddress = DEFAULT_MARKET_ADDRESS[[__classPrivateFieldGet(this, _Rentero_chain, "f"), __classPrivateFieldGet(this, _Rentero_rentMode, "f")].join('-')];
        }
        __classPrivateFieldSet(this, _Rentero_RenteroMarket, new ethers.ethers.Contract(marketAddress, MARKET_ABI, signer), "f");
    }
    lendNFT(nftAddress, tokenId, erc20Address, whitelist, deposit, dailyPrice, paymentCycle, minRentalDays, maxRentalDays) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = yield __classPrivateFieldGet(this, _Rentero_RenteroMarket, "f").lend(nftAddress, tokenId, erc20Address, whitelist, deposit, dailyPrice, paymentCycle, minRentalDays, maxRentalDays);
                const result = yield tx.wait();
                return result;
            }
            catch (error) {
                return (error === null || error === void 0 ? void 0 : error.error) || error;
            }
        });
    }
    reLendNFT(nftAddress, tokenId, erc20Address, whitelist, deposit, dailyPrice, paymentCycle, minRentalDays, maxRentalDays) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = yield __classPrivateFieldGet(this, _Rentero_RenteroMarket, "f").reLend(nftAddress, tokenId, erc20Address, whitelist, deposit, dailyPrice, paymentCycle, minRentalDays, maxRentalDays);
                const result = yield tx.wait();
                return result;
            }
            catch (error) {
                return (error === null || error === void 0 ? void 0 : error.error) || error;
            }
        });
    }
    rentNFT(contractAddress, tokenId, rentDays) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = yield __classPrivateFieldGet(this, _Rentero_RenteroMarket, "f").rent(contractAddress, tokenId, rentDays);
                const result = yield tx.wait();
                return result;
            }
            catch (error) {
                return (error === null || error === void 0 ? void 0 : error.error) || error;
            }
        });
    }
    earlyReturn(contractAddress, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = yield __classPrivateFieldGet(this, _Rentero_RenteroMarket, "f").abort(contractAddress, tokenId);
                const result = yield tx.wait();
                return result;
            }
            catch (error) {
                return (error === null || error === void 0 ? void 0 : error.error) || error;
            }
        });
    }
    redeemNFT(contractAddress, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = yield __classPrivateFieldGet(this, _Rentero_RenteroMarket, "f").reclaim(contractAddress, tokenId);
                const result = yield tx.wait();
                return result;
            }
            catch (error) {
                return (error === null || error === void 0 ? void 0 : error.error) || error;
            }
        });
    }
}
_Rentero_RenteroMarket = new WeakMap(), _Rentero_rentMode = new WeakMap(), _Rentero_chain = new WeakMap();

exports.Rentero = Rentero;
exports.RenteroNFT = RenteroNFT;
