<script setup lang="ts">
  import { useWallet } from 'solana-wallets-vue';
  import { storeToRefs } from 'pinia';

  import { 
  Connection, 
  clusterApiUrl, 
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';
  
  import { useBalanceStore } from '@stores/balance';

  const CLUSTER_URI = 'devnet';

  function depositIntoPool() {
    console.log('hi you clicked me!');
  }

  function withdrawFunds() {
    console.log('hi you clicked me!');
  }

  function displayWalletBalance() {

  }

  //import { } from '@providers/'

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
      <div class="current-balance">
        Current Wallet Balance: {{ store.balance }}
      </div>
      <div class="pool-actions">
        <div class="button-element" @click="depositIntoPool()">Deposit Funds</div>
        <div class="button-element" @click="withdrawFunds()">Withdraw Funds</div>
    </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@app/components/deposit/Deposit.scss';
</style>