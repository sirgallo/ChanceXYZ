import { defineStore } from 'pinia';

import { 
  checkExistsAndNew, 
  withinRange,
  cleanValue 
} from '@utils/StateValidation';

export const useWalletStore = defineStore('balance', {
  state: () => ({
    balance: 0,
    stakeInPool: 0,
    enqueuedDeposit: 0,
    enqueuedWithdrawl: 0,
    displayCleanDeposit: 0,
    displayCleanWithdrawl: 0
  }),
  getters: {
    getBalance: (state: any) => state.balance,
    getStakeInPool: (state: any) => state.stakeInPool,
    getEnqueuedDeposit: (state: any) => state.enqueuedDeposit,
    getEnqueuedWithdrawal: (state: any) => state.enqueuedWithdrawl
  },
  actions: {
    setBalance(balance: number) {
     this.balance = checkExistsAndNew(balance, this.balance);
    },
    setStakeInPool(stake: number) {
      this.stakeInPool = checkExistsAndNew(stake, this.stakeInPool);
    },
    setEnqueuedDeposit(deposit: number) {
      this.enqueuedDeposit = checkExistsAndNew(withinRange(deposit, this.balance), this.enqueuedDeposit);
      this.setCleanDeposit();
    },
    setEnqueuedWithdrawl(withdraw: number) {
      this.enqueuedWithdrawl = checkExistsAndNew(withinRange(withdraw, this.stakeInPool), this.enqueuedWithdrawl);
      this.setCleanWithdrawl();
    },
    setCleanDeposit() {
      this.displayCleanDeposit = cleanValue(this.enqueuedDeposit);
    },
    setCleanWithdrawl() {
      this.displayCleanWithdrawl = cleanValue(this.enqueuedWithdrawl);
    }
  }
});