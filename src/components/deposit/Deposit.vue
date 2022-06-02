<script setup lang="ts">
  import { useWallet } from 'solana-wallets-vue';
  import { storeToRefs } from 'pinia';
  import { useBalanceStore } from '@stores/balance';

  interface DepositProps {
    title: string;
    titleIcon: 'Alt' | 'Stable';
  }

  const { publicKey, connected } = useWallet();

  const props = defineProps<DepositProps>();
  const store = useBalanceStore();

  const { balance } = storeToRefs(store);
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
    <div class="wallet-stats">
      <p>Current Wallet Balance: {{ store.balance }}</p>
    </div>
    <!--
    <button @click="requestAirdrop()">request airdrop</button>
    <p>Current Wallet Balance: {{ store.balance }}</p>
    -->
  </div>
</template>

<style lang="scss">
  @import '@app/components/deposit/Deposit.scss';
</style>