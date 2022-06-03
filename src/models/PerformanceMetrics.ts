export interface PerformanceMetricsResponse {
  id: number;
  jsonrpc: string;
  result: ResultsArrayElement[];
}

export interface ResultsArrayElement {
  numSlots: number;
  numTransactions: number;
  samplePeriodSecs: number;
  slot: number;
}