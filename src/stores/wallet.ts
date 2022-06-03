import { defineStore } from 'pinia';

export const useWalletStore = defineStore('balance', {
  state: () => ({
    balance: 0
  }),
  getters: {
    getBalance: (state: any) => state.balance
  },
  actions: {
    setBalance(balance: number) {
      if (balance && balance !== this.balance) {
        this.balance = balance;
      }
    }
  }
});