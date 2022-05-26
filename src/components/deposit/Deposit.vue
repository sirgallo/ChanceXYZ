<script setup lang="ts">
  interface DepositProps {
    title: string
  }

  const props = defineProps<DepositProps>();
</script>

<template>
  <div class="deposit-container">
    <h2>{{ title }}</h2>
  </div>
</template>

<style lang="scss">
  @import '@app/components/deposit/Deposit.scss';
</style>