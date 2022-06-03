import { defineStore } from 'pinia';

import { MAX_SIG_FIGS } from '@app/configs/SigFigs';

export const useWalletStore = defineStore('balance', {
  state: () => ({
    balance: 0,
    stakeInPool: 0,
    enqueuedDeposit: 0,
    enqueuedWithdrawl: 0
  }),
  getters: {
    getBalance: (state: any) => state.balance,
    getStakeInPool: (state: any) => state.stakeInPool,
    getEnqueuedDeposit: (state: any) => state.enqueuedDeposit,
    getEnqueuedWithdrawal: (state: any) => state.enqueuedWithdrawl
  },
  actions: {
    setBalance(balance: number) {
      if (balance && balance !== this.balance) {
        this.balance = balance;
      }
    },
    setStakeInPool(stake: number) {
      if (stake && stake !== this.stakeInPool) {
        this.stakeInPool = stake;
      }
    },
    setEnqueuedDeposit(deposit: number) {
      this.enqueuedDeposit = this.cleanValue(deposit, 'Deposit');
    },
    setEnqueuedWithdrawl(withdraw: number) {
      this.enqueuedWithdrawl = this.cleanValue(withdraw, 'Withdrawl');
    },
    cleanValue(val: number, type: 'Deposit' | 'Withdrawl') {
      if (val) {
        if (val > this.balance && type === 'Deposit') {
          val = parseFloat(this.balance.toFixed(MAX_SIG_FIGS));
        } else if (val > this.stakeInPool && type === 'Withdrawl') {
          val = parseFloat(this.stakeInPool.toFixed(MAX_SIG_FIGS));
        } else if (val < 0) {
          val = 0;
        } else {
          val = parseFloat(val.toFixed(MAX_SIG_FIGS));
        }
        
        return val;
      } else {
        return 0;
      }
    }
  }
});