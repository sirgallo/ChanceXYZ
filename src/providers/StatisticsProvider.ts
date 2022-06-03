import type { PerformanceMetricsResponse } from "@app/models/PerformanceMetrics";
import { asyncExponentialBackoff } from '@app/utils/AsyncExponentialBackoff';

export class StatisticsProvider {
  constructor() {}

  async getRecentPerformanceSamples(network: string): Promise<PerformanceMetricsResponse> {
    const body = {
      jsonrpc: '2.0', 
      id: 1, 
      method: 'getRecentPerformanceSamples', 
      params: [ 4 ]
    }

    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    const resp = await asyncExponentialBackoff(network, 5, 500, fetch, postRequest);
    return resp.json();
  }
}