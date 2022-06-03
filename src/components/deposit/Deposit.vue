<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  
  import { useWalletStore } from '@stores/wallet';
  import { WalletProvider } from '@providers/WalletProvider';
  import { CLUSTER_URI } from '@app/configs/Cluster';

  interface DepositProps {
    title: string;
    titleIcon: 'Alt' | 'Stable';
  }

  const props = defineProps<DepositProps>();
  const walletStore = useWalletStore();

  walletStore.setNetwork(CLUSTER_URI);

  const currencyDeposit = ref(0);

  const { balance, cluster } = storeToRefs(walletStore);

  const walletProvider = new WalletProvider(cluster.value);

  async function depositIntoPoolClick() {
    if (currencyDeposit.value === 0) return;
    
    const newBalance = await walletProvider.depositIntoPool(currencyDeposit.value);
    walletStore.setBalance(newBalance);
  }

  async function withdrawFundsClick() {
    await walletProvider.withdrawFunds();
  }

  async function devRequestAirdropClick() {
    const newBalance = await walletProvider.devRequestAirdrop();
    walletStore.setBalance(newBalance);
  }
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
      <input class="input-box" v-model="currencyDeposit" placeholder=0 />
      <div class="current-balance">
        <b>Wallet Balance:</b> {{ balance }}
      </div>
      <div v-if="currencyDeposit > balance" class="input-beyond-max">deposit amount should not exceed balance</div>
      <div class="pool-actions">
        <div class="button-element" @click="depositIntoPoolClick()">Deposit Funds</div>
        <div class="button-element" @click="withdrawFundsClick()">Withdraw Funds</div>
      </div>
      <div class="dev">
        <div class="button-element" @click="devRequestAirdropClick()">Request Airdrop</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@app/components/deposit/Deposit.scss';
</style>