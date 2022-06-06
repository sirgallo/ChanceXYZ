<script setup lang="ts">
  import { ref, Ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  
  import { useWalletStore } from '@stores/wallet';
  import { useFeatureStore } from '@stores/feature';
  import { useNetworkStore } from '@stores/network';

  import { WalletProvider } from '@providers/WalletProvider';
  import { onMousemove } from '@utils/Animation';
  import { cleanValue } from '@utils/StateValidation';

  interface DepositProps {
    title: string;
    titleIcon: 'Alt' | 'Stable';
  }

  const props = defineProps<DepositProps>();
  
  const walletStore = useWalletStore();
  const featureStore = useFeatureStore();
  const networkStore = useNetworkStore();

  const { lotteryToggleDeposit, xPos } = storeToRefs(featureStore);
  const { 
    balance, stakeInPool, enqueuedDeposit, enqueuedWithdrawl, 
    displayCleanDeposit, displayCleanWithdrawl } = storeToRefs(walletStore);
  const { cluster } = storeToRefs(networkStore);

  const walletProvider = new WalletProvider(cluster.value);

  async function depositIntoPoolClick() {
    if (enqueuedDeposit.value === 0) return;
    
    const newBalance = await walletProvider.depositIntoPool(enqueuedDeposit.value);
    walletStore.setBalance(newBalance);
  }

  async function withdrawFundsClick() {
    await walletProvider.withdrawFunds();
  }

  async function devRequestAirdropClick() {
    const newBalance = await walletProvider.devRequestAirdrop();
    walletStore.setBalance(newBalance);
  }

  walletStore.$subscribe( (mutation, state) => {
    walletStore.setEnqueuedDeposit(state.enqueuedDeposit);
    walletStore.setEnqueuedWithdrawl(state.enqueuedWithdrawl);
  });
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
      <div class="toggle-button-element" @click="featureStore.setLotteryToggleDeposit(true)">Deposit</div>
      <div class="toggle-button-element" @click="featureStore.setLotteryToggleDeposit(false)">Withdraw</div>
    </div>
    <div v-if="lotteryToggleDeposit" class="wallet-stats">
       <Knob
        v-model="displayCleanDeposit"
        :min="0"
        :max="balance"
        :size="125"
        :strokeWidth="6"
        valueColor="var(--c-green)" 
        rangeColor="var(--color-background)">
      </Knob>
      <input class="input-box" type="number" v-model="enqueuedDeposit" placeholder=0 />
      <div class="current-balance">
        <span>Wallet Balance: <b>{{ balance }}</b></span>
      </div>
      <div class="pool-actions">
        <div class="button-element" @click="depositIntoPoolClick()">Deposit Funds</div>
        <div v-if="cluster !== 'mainnet-beta'" class="button-element" @click="devRequestAirdropClick()">Request Airdrop</div>
      </div>
    </div>
    <div v-else class="wallet-stats">
      <Knob
        v-model="displayCleanWithdrawl"
        :min="0"
        :max="stakeInPool"
        :size="125"
        :strokeWidth="6"
        valueColor="var(--c-orange)" 
        rangeColor="var(--color-background)">
      </Knob>
      <input class="input-box" type="number" v-model="enqueuedWithdrawl" placeholder=0 />
      <div class="current-balance">
        <span>Pool Contribution: <b>{{ stakeInPool }}</b></span>
      </div>
      <div class="pool-actions">
        <div class="button-element" @click="withdrawFundsClick()">Withdraw Funds</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@components/lottery/Lottery.scss';
</style>