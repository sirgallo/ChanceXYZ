<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core';
  import Wallet from '@app/components/wallet/Wallet.vue';
  
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="navbar-wrapper">
    <div class="title">
      <h1>ChanceDAO</h1>
      <div class="dice">
        <i class="fa-2x fa-solid fa-dice"></i>
      </div>
    </div>
    <div class="router">
      <nav class="router-wrapper">
        <div class="router-link-wrap">
          <i class="fa-lg fa-solid fa-house"></i>
          <RouterLink class="router-link" to="/">Home</RouterLink>
        </div>
        <div class="router-link-wrap">
          <i class="fa-lg fa-solid fa-money-bill-wave"></i>
          <RouterLink class="router-link" to="/stable">Stable</RouterLink>
        </div>
        <div class="router-link-wrap">
          <i class="fa-lg fa-brands fa-bitcoin"></i>
          <RouterLink class="router-link" to="/alt">Alt</RouterLink>
        </div>
        <div class="router-link-wrap">
          <i class="fa-lg fa-solid fa-chart-bar"></i>
          <RouterLink class="router-link" to="/analysis">Analysis</RouterLink>
        </div>
      </nav>
    </div>
    <div class="user-actions">
      <div class="dark-mode-toggle" @click="toggleDark()">
        <i class="fa-solid fa-toggle-on" v-tooltip="'color mode'"></i>
      </div>
      <Wallet />
    </div>
  </div>
</template>

<style lang="scss">
  @import '@app/components/nav/Navbar.scss';
</style>