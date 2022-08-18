export type SUPPORT_NETWORK = 'mainnet' | 'ropsten' | 'goerli'

export const NETWORK_GRAPHS: Record<SUPPORT_NETWORK, string> = {
  'mainnet': "",
  "ropsten": 'https://api.thegraph.com/subgraphs/name/john-rentero/rentero-market',
  "goerli": ''
}