import { defineStore } from 'pinia';
import type { Cluster } from '@solana/web3.js';

import { StatisticsProvider } from '@providers/StatisticsProvider';
import type { PerformanceMetricsResponse } from '@models/PerformaceMetrics';
import { checkExistsAndNew } from '@utils/StateValidation';

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
      this.cluster = checkExistsAndNew(network, this.cluster);
    },
    async setPerformanceMetrics() {
      const statsProvider = new StatisticsProvider();
      const apiEndpoint = this.cluster === 'devnet' 
        ? 'https://api.devnet.solana.com'
        : this.cluster === 'mainnet-beta'
        ? 'https://api.mainnet-beta.solana.com'
        : 'https://api.testnet.solana.com';
      
      const resp: PerformanceMetricsResponse = await statsProvider.getRecentPerformanceSamples(apiEndpoint);

      const newTps = Math.floor(resp.result[0].numTransactions / resp.result[0].samplePeriodSecs);
      this.tps = checkExistsAndNew(newTps, this.tps);
    }
  }
});