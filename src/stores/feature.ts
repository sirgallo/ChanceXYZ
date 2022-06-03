import { defineStore } from 'pinia';

export const useFeatureStore = defineStore('feature', {
  state: () => ({
    lotteryToggleDeposit: true,
  }),
  getters: {
    getLotteryToggleDeposit: (state: any) => state.lotteryToggle
  },
  actions: {
    setLotteryToggleDeposit(truthy: boolean) {
      if (truthy !== this.lotteryToggleDeposit) {
        this.lotteryToggleDeposit = truthy;
      }
    }
  }
});