<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Navbar from '@components/nav/Navbar.vue';
  import Footer from '@components/footer/Footer.vue';
  import NetworkStats from '@components/network/NetworkStats.vue';
</script>

<template>
  <div class="stage">
    <NetworkStats></NetworkStats>
    <Navbar></Navbar>
    <div class="view">
      <RouterView></RouterView>
    </div>
    <Footer></Footer>
  </div>
</template>

<style lang="scss">
  @import '@app/assets/base.scss';
  @import '@app/App.scss';
</style>
