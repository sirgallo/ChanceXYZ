import { defineStore } from 'pinia';

import type { Cluster } from '@solana/web3.js';

export const useWalletStore = defineStore('balance', {
  state: () => ({
    balance: 0,
    cluster: 'devnet'
  }),
  getters: {
    getBalance: (state: any) => state.balance,
    getNetwork: (state: any) => state.cluster
  },
  actions: {
    setBalance(balance: number) {
      this.balance = balance;
    },
    setNetwork(network: Cluster) {
      this.cluster = network
    }
  }
});