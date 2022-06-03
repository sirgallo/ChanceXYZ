import type { PerformanceMetricsResponse } from "@app/models/PerformanceMetrics";

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

    const resp = await fetch(network, postRequest);
    return resp.json();
  }
}