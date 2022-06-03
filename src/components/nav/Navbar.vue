<script setup lang="ts">
  import { watch } from 'vue';
  import { useDark, useToggle } from '@vueuse/core';
  import { useWallet } from 'solana-wallets-vue';
  import { storeToRefs } from 'pinia';

  import Wallet from '@app/components/wallet/Wallet.vue';

  import { useWalletStore } from '@stores/wallet';
  import { WalletProvider } from '@providers/WalletProvider';
  import { CLUSTER_URI} from '@app/configs/Cluster';
  
  const { connected } = useWallet();
  
  const walletStore = useWalletStore();
  const { balance, cluster } = storeToRefs(walletStore);

  const walletProvider = new WalletProvider(CLUSTER_URI);

  const isDark = useDark();
  const toggleDark = useToggle(isDark);

  watch(connected, async val => {
    if (val) {
      const currBalance = await walletProvider.getBalance();
      walletStore.setBalance(currBalance);
    }
  });
</script>

<template>
  <div class="navbar-wrapper">
    <div class="title">
      <div class="dice">
        <i class="fa-2x fa-solid fa-dice"></i>
      </div>
    </div>
    <div class="router">
      <nav class="router-wrapper">
        <RouterLink class="router-link" to="/">Home</RouterLink>
        <RouterLink class="router-link" to="/stable">Lottery</RouterLink>
        <RouterLink class="router-link" to="/analysis">Analytics</RouterLink>
      </nav>
    </div>
    <div class="user-actions">
      <div class="dark-mode-toggle" @click="toggleDark()">
        <div v-if="isDark">
          <i class="fa-solid fa-toggle-on"></i>
        </div>
        <div v-else>
          <i class="fa-solid fa-toggle-off"></i>
        </div>
      </div>
      <Wallet></Wallet>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@app/components/nav/Navbar.scss';
</style>