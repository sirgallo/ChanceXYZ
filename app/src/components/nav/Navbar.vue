<script setup lang="ts">
  import { watch } from 'vue';
  import { useDark, useToggle } from '@vueuse/core';
  import { useWallet } from 'solana-wallets-vue';
  import { storeToRefs } from 'pinia';

  import { useWalletStore } from '@stores/wallet';
  import { useNetworkStore } from '@stores/network';

  import { WalletProvider } from '@providers/WalletProvider';
  
  import { CLUSTER_URI } from '@app/configs/Cluster';

  import Wallet from '@app/components/wallet/Wallet.vue';
  
  const { connected } = useWallet();
  
  const walletStore = useWalletStore();
  const networkStore = useNetworkStore();

  const { balance } = storeToRefs(walletStore);
  const { cluster } = storeToRefs(networkStore);

  const walletProvider = new WalletProvider(cluster.value);

  const isDark = useDark();
  const toggleDark = useToggle(isDark);

  watch(connected, async val => {
    if (val) {
      const currBalance = await walletProvider.getBalance();
      
      networkStore.setNetwork(CLUSTER_URI);
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