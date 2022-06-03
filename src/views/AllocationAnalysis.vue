<script setup lang="ts"> 
  import { storeToRefs } from 'pinia';
  import { useFeatureStore } from '@stores/feature';

  const featureStore = useFeatureStore();

  const { xPos } = storeToRefs(featureStore);

  function onMousemove(e) {
    featureStore.setXPos(e.clientX);
  }
</script>

<template>
  <div class="view-container">
    <div class="init-padding"></div>
    <div class="analysis-container">
      <div class="analysis-title">
        <h2
          @mousemove="onMousemove"
          :style="{ color: `hsl(${xPos}, 55%, 65%)` }"
          class="color-change">
          Coming Soon<b class="hidden-ref">{{ xPos }}</b>
        </h2>
      </div>
    </div>
    <div class="bottom-padding"></div>
  </div>
</template>

<style lang="scss">
  @import '@views/styles/Shared.scss';
  @import '@views/styles/AllocationAnalysis.scss';

  .analysis-title {
    background-color: var(--color-background-soft);
    padding: 0.5rem;
    align-items: center;
    margin-bottom: 1.5rem;
    border-radius: 1rem;
    //border: 2px solid var(--color-brand-title);
    box-shadow: 0px 6px 3px -3px var(--color-brand-title);
  }
</style>