<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  
  import { useFeatureStore } from '@stores/feature';
  import { onMousemove } from '@utils/Animation';
  import Lottery from '@components/lottery/Lottery.vue';

  const title = 'Stablecoin Lottery';
  const titleIcon = 'Stable';

  const featureStore = useFeatureStore();
  const { xPos } = storeToRefs(featureStore);
</script>

<template>
  <div class="view-container">
    <div class="init-padding"></div>
    <div class="lottery-view-container">
      <div class="lottery-title">
        <h2 
          @mousemove="onMousemove"
          :style="{ color: `hsl(${xPos}, 55%, 65%)` }"
          class="color-change">
          {{ title }}
        </h2>
        <div class="lottery-title-icon">
          <i v-if="titleIcon === 'Stable'" class="fa-lg fa-solid fa-money-bill-wave dollar-color">{{ xPos }}</i>
        </div>
      </div>
      <Lottery
        title="Stablecoin Lottery"
        titleIcon="Stable">
      </Lottery>
    </div>
    <div class="bottom-padding"></div>
  </div>
</template>

<style lang="scss">
  @import '@views/styles/Shared.scss';
  @import '@views/styles/StableLottery.scss';
</style>