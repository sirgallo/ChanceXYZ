import { defineStore } from 'pinia';

import { checkExistsAndNew } from '@utils/StateValidation';

export const useProgramStore = defineStore('program', {
  state: () => ({
    poolBalance: 0
  }),
  getters: {
    getPoolBalance: (state: any) => state.poolBalance
  },
  actions: {
    setPoolBalance(balance: number) {
      this.poolBalance = checkExistsAndNew(balance, this.poolBalance);
    }
  }
});