<script setup lang="ts">
  import { ref, Ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  
  import { useWalletStore } from '@stores/wallet';
  import { useFeatureStore } from '@stores/feature';
  import { useNetworkStore } from '@stores/network';

  import { WalletProvider } from '@providers/WalletProvider';

  interface DepositProps {
    title: string;
    titleIcon: 'Alt' | 'Stable';
  }

  const MAX_SIG_FIGS = 3;

  const props = defineProps<DepositProps>();
  
  const walletStore = useWalletStore();
  const featureStore = useFeatureStore();
  const networkStore = useNetworkStore();

  const { lotteryToggleDeposit, xPos } = storeToRefs(featureStore);
  const { balance } = storeToRefs(walletStore);
  const { cluster } = storeToRefs(networkStore);

  const currencyDeposit: Ref<number> = ref(0);
  const currencyWithdraw: Ref<number> = ref(0);

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

  watch(currencyDeposit, async val => {
    if (val > balance.value) {
      currencyDeposit.value = parseFloat(balance.value.toFixed(MAX_SIG_FIGS));
    } else if (val < 0) {
      currencyDeposit.value = 0;
    } else {
      currencyDeposit.value = parseFloat(val.toFixed(MAX_SIG_FIGS));
    }
  });

  watch(currencyWithdraw, async val => {
    if (val > balance.value) {
      currencyWithdraw.value = parseFloat(balance.value.toFixed(MAX_SIG_FIGS));
    } else if (val < 0) {
      currencyWithdraw.value = 0;
    } else {
      currencyWithdraw.value = parseFloat(val.toFixed(MAX_SIG_FIGS));
    }
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
      <div class="toggle-button-element" @click="toggleDeposit(true)">Deposit</div>
      <div class="toggle-button-element" @click="toggleDeposit(false)">Withdraw</div>
    </div>
    <div v-if="lotteryToggleDeposit" class="wallet-stats">
       <Knob
        v-model="currencyDeposit"
        :min="0"
        :max="balance"
        :size="175"
        :step="0.01"
        valueColor="var(--c-green)" 
        rangeColor="var(--color-background)">
      </Knob>
      <input class="input-box" type="number" v-model="currencyDeposit" placeholder=0 />
      <div class="current-balance">
        <span>Wallet Balance: <b>{{ balance }}</b></span>
      </div>
      <div class="pool-actions">
        <div class="button-element" @click="depositIntoPoolClick()">Deposit Funds</div>
        <div class="button-element" @click="devRequestAirdropClick()">Request Airdrop</div>
      </div>
    </div>
    <div v-else class="wallet-stats">
      <Knob
        v-model="currencyWithdraw"
        :min="0"
        :max="balance"
        :size="175"
        :step="0.01"
        valueColor="var(--c-orange)" 
        rangeColor="var(--color-background)">
      </Knob>
      <input class="input-box" type="number" v-model="currencyWithdraw" placeholder=0 />
      <div class="current-balance">
        <span>Wallet Balance: <b>{{ balance }}</b></span>
      </div>
      <div class="pool-actions">
        <div class="button-element" @click="withdrawFundsClick()">Withdraw Funds</div>
        <div class="button-element" @click="devRequestAirdropClick()">Request Airdrop</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@components/lottery/Lottery.scss';
</style>