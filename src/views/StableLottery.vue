<script setup lang="ts">
  import Lottery from '@components/lottery/Lottery.vue';
</script>

<template>
  <div class="view-container">
    <div class="init-padding"></div>
    <Lottery
      title="Stablecoin Lottery"
      titleIcon="Stable">
    </Lottery>
    <div class="bottom-padding"></div>
  </div>
</template>

<style lang="scss">
  @import '@views/styles/Shared.scss';
  @import '@views/styles/StableLottery.scss';
</style>