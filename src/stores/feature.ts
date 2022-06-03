import { defineStore } from 'pinia';
import { defaultHSLColor } from '@app/configs/Animation';

export const useFeatureStore = defineStore('feature', {
  state: () => ({
    lotteryToggleDeposit: true,
    xPos: defaultHSLColor
  }),
  getters: {
    getLotteryToggleDeposit: (state: any) => state.lotteryToggle,
    getXPos: (state: any) => state.xPos
  },
  actions: {
    setLotteryToggleDeposit(truthy: boolean) {
      if (truthy !== this.lotteryToggleDeposit) {
        this.lotteryToggleDeposit = truthy;
      }
    },
    setXPos(val: number) {
      if (val !== this.xPos) {
        this.xPos = val;
      }
    }
  }
});