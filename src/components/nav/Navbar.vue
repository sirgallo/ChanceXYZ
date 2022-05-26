<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core';
  import Wallet from '@app/components/wallet/Wallet.vue';
  
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="navbar-wrapper">
    <div class="title">
      <h1>Chance</h1>
      <div class="dice">
        <i class="fa-2x fa-solid fa-dice"></i>
      </div>
    </div>
    <div class="router">
      <nav class="router-wrapper">
        <RouterLink class="router-link" to="/">Home</RouterLink>
        <RouterLink class="router-link" to="/stable">Stable</RouterLink>
        <RouterLink class="router-link" to="/alt">Alt</RouterLink>
        <RouterLink class="router-link" to="/analysis">Analysis</RouterLink>
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