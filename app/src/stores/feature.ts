import { defineStore } from 'pinia';

import { checkExistsAndNew } from '@utils/StateValidation';
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
      this.lotteryToggleDeposit = checkExistsAndNew(truthy, this.lotteryToggleDeposit);
    },
    setXPos(val: number) {
      this.xPos = checkExistsAndNew(val, this.xPos);
    }
  }
});