import { defineStore } from 'pinia';

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    balance: 0
  }),
  getters: {
    getBalance: (state: any) => state.balance
  },
  actions: {
    setBalance(balance: number) {
      this.balance = balance;
    },

    async fetchBalance() {

    }
  }
});