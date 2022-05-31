<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core';

  import Wallet from '@app/components/wallet/Wallet.vue';
  
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
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
        <div class="router-link-wrap">
          <RouterLink class="router-link" to="/">Home</RouterLink>
        </div>
        <div class="router-link-wrap">
          <RouterLink class="router-link" to="/stable">Lottery</RouterLink>
        </div>
        <div class="router-link-wrap">
          <RouterLink class="router-link" to="/analysis">Analytics</RouterLink>
        </div>
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