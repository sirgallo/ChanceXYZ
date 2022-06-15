import { useFeatureStore } from '@stores/feature';

export function onMousemove(e) {
  const featureStore = useFeatureStore();
  featureStore.setXPos(e.clientX);
}