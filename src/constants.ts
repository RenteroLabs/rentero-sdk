export type SUPPORT_NETWORK = 'mainnet' | 'rinkeby' | 'bsc' | 'bsctestnet'

export const NETWORK_GRAPHS: Record<SUPPORT_NETWORK, string> = {
  'mainnet': "",
  "rinkeby": "https://rinkeby.rentero.io/subgraphs/name/john-rentero/rentero-market",
  "bsc": "",
  "bsctestnet": "https://bsc-testnet.rentero.io/subgraphs/name/john-rentero/rentero-market",
}