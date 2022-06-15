import { MAX_SIG_FIGS } from '@app/configs/SigFigs';

export function checkExistsAndNew(val: any, compareVal: any): any {
  if (val != null && val !== compareVal) return val;
  else return compareVal;
}

export function withinRange(val: any, compareVal: number) {
  if (val > compareVal) return compareVal;
  else if (val < 0) return 0;
  else return val;
}

export function cleanValue(val: number): number { 
  if (val) return parseFloat(val.toFixed(MAX_SIG_FIGS));
  else return 0;
}