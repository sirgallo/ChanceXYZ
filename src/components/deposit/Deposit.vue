<script setup lang="ts">
  interface DepositProps {
    title: string;
    titleIcon: 'Alt' | 'Stable';
  }

  const props = defineProps<DepositProps>();
</script>

<template>
  <div class="deposit-container">
    <div class="deposit-title">
      <h2>{{ title }}</h2>
      <div class="deposit-title-icon">
        <i v-if="titleIcon === 'Stable'" class="fa-lg fa-solid fa-money-bill-wave dollar-color"></i>
        <i v-else class="fa-lg fa-brands fa-bitcoin bitcoin-color"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@app/components/deposit/Deposit.scss';
</style>