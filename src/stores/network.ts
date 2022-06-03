import { defineStore } from 'pinia';

import type { Cluster } from '@solana/web3.js';

export const useNetworkStore = defineStore('network', {
  state: () => ({
    cluster: 'devnet'
  }),
  getters: {
    getNetwork: (state: any) => state.cluster
  },
  actions: {
    setNetwork(network: Cluster) {
      if (network && network !== this.cluster) {
        this.cluster = network;
      }
    }
  }
});