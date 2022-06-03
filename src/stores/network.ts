import { defineStore } from 'pinia';
import type { Cluster } from '@solana/web3.js';

import { StatisticsProvider } from '@providers/StatisticsProvider';
import type { PerformanceMetricsResponse } from '@app/models/PerformanceMetrics';

export const useNetworkStore = defineStore('network', {
  state: () => ({
    cluster: 'devnet',
    tps: 0
  }),
  getters: {
    getNetwork: (state: any) => state.cluster,
    getTps: (state: any) => state.getTps
  },
  actions: {
    setNetwork(network: Cluster) {
      if (network && network !== this.cluster) {
        this.cluster = network;
      }
    },
    async setPerformanceMetrics() {
      const statsProvider = new StatisticsProvider();
      const apiEndpoint = this.cluster === 'devnet' 
        ? `https://api.devnet.solana.com`
        : `https://api.testnet.solana.com`;
      
      const resp: PerformanceMetricsResponse = await statsProvider.getRecentPerformanceSamples(apiEndpoint);

      console.log(resp);

      const newTps = Math.floor(resp.result[0].numTransactions / resp.result[0].samplePeriodSecs);
      this.tps = newTps;
    }
  }
});