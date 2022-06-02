<script setup lang="ts">
  import Deposit from '@components/deposit/Deposit.vue';
</script>

<template>
  <div class="view-container">
    <div class="init-padding"></div>
    <Deposit 
      title="Stablecoin Lottery"
      titleIcon="Stable">
    </Deposit>
    <div class="bottom-padding"></div>
  </div>
</template>

<style lang="scss">
  @import '@views/styles/Shared.scss';
  @import '@views/styles/StableLottery.scss';
</style>