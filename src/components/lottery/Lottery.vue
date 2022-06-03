<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  
  import { useWalletStore } from '@stores/wallet';
  import { useFeatureStore } from '@stores/feature';
  import { useNetworkStore } from '@stores/network';

  import { WalletProvider } from '@providers/WalletProvider';

  interface DepositProps {
    title: string;
    titleIcon: 'Alt' | 'Stable';
  }

  const props = defineProps<DepositProps>();
  
  const walletStore = useWalletStore();
  const featureStore = useFeatureStore();
  const networkStore = useNetworkStore();

  const { lotteryToggleDeposit, xPos } = storeToRefs(featureStore);
  const { balance } = storeToRefs(walletStore);
  const { cluster } = storeToRefs(networkStore);

  const currencyDeposit = ref(0);
  const currencyWithdraw = ref(0);

  const walletProvider = new WalletProvider(cluster.value);

  function onMousemove(e) {
    featureStore.setXPos(e.clientX);
  }

  function toggleDeposit(truthy: boolean) {
    featureStore.setLotteryToggleDeposit(truthy);
  }

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
  <div class="lottery-container">
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
    <div class="toggle-buttons">
      <div class="toggle-button-element" @click="toggleDeposit(true)">Deposit</div>
      <div class="toggle-button-element" @click="toggleDeposit(false)">Withdraw</div>
    </div>
    <div v-if="lotteryToggleDeposit" class="wallet-stats">
      <input class="input-box" v-model="currencyDeposit" placeholder=0 />
      <div class="current-balance">
        <span>Wallet Balance: <b>{{ balance }}</b></span>
      </div>
      <div v-if="currencyDeposit > balance" class="input-beyond-max">deposit amount cannot exceed current balance</div>
      <div class="pool-actions">
        <div class="button-element" @click="depositIntoPoolClick()">Deposit Funds</div>
      </div>
      <div class="pool-actions">
        <div class="button-element" @click="devRequestAirdropClick()">Request Airdrop</div>
      </div>
    </div>
    <div v-else class="wallet-stats">
      <input class="input-box" v-model="currencyWithdraw" placeholder=0 />
      <div class="current-balance">
        <span>Wallet Balance: <b>{{ balance }}</b></span>
      </div>
      <div v-if="currencyWithdraw > balance" class="input-beyond-max">withdraw amount cannot exceed deposited amount</div>
      <div class="pool-actions">
        <div class="button-element" @click="withdrawFundsClick()">Withdraw Funds</div>
      </div>
      <div class="pool-actions">
        <div class="button-element" @click="devRequestAirdropClick()">Request Airdrop</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@app/components/lottery/Lottery.scss';
</style>