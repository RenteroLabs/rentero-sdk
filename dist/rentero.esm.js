import { gql, request } from 'graphql-request';

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
    "rinkeby": "https://rinkeby.rentero.io/subgraphs/name/john-rentero/rentero-market",
    "bsc": "",
    "bsctestnet": "https://bsc-testnet.rentero.io/subgraphs/name/john-rentero/rentero-market",
};

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
            const query = gql `
      query getRentNFTs($renter: String!, $contracts: [String!], $timestamp: String!) {
        leases(where: { 
          renter: $renter, 
          nftAddress_in: $contracts, 
          expires_gt: $timestamp ,
          }) {
          tokenId
          nftAddress
          lender
          expires
        }
      }
    `;
            const variables = {
                renter: renterAddress.toLowerCase(),
                contracts: __classPrivateFieldGet(this, _RenteroNFT_targetContracts, "f"),
                timestamp: timestamp
            };
            return yield request(__classPrivateFieldGet(this, _RenteroNFT_graphpath, "f"), query, variables);
        });
    }
    getRentInfoById(contractAddress, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = gql `
      query getRenterAddress($id: String!) {
        lease(id: $id) {
          renter
          lender
          expires
        }
      }
    `;
            const variables = {
                id: [contractAddress.toLowerCase(), tokenId].join('-')
            };
            return yield request(__classPrivateFieldGet(this, _RenteroNFT_graphpath, "f"), query, variables);
        });
    }
    getLendNFTsByAddress(lendAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = gql `
      query getLendNFTs($lender: String!, $contracts: [String!]) {
        leases(where: {
          lender: $lender, 
          nftAddress_in: $contracts, 
        }) {
          tokenId
          nftAddress
          lender
          renter
          expires 
        }
      }
    `;
            const variables = {
                lender: lendAddress.toLowerCase(),
                contracts: __classPrivateFieldGet(this, _RenteroNFT_targetContracts, "f"),
            };
            return yield request(__classPrivateFieldGet(this, _RenteroNFT_graphpath, "f"), query, variables);
        });
    }
    getAllNFTsInMarket() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = gql `
      query getNFTs($contracts: [String!]) {
        leases(where: {nftAddress_in: $contracts}) {
          tokenId
          nftAddress
          lender
          renter
          expires 
        }
      }
    `;
            const variables = {
                contracts: __classPrivateFieldGet(this, _RenteroNFT_targetContracts, "f"),
            };
            return yield request(__classPrivateFieldGet(this, _RenteroNFT_graphpath, "f"), query, variables);
        });
    }
}
_RenteroNFT_targetContracts = new WeakMap(), _RenteroNFT_graphpath = new WeakMap();

var Rentero = {};

var Rentero$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Rentero
});

export { Rentero$1 as Rentero, RenteroNFT };
