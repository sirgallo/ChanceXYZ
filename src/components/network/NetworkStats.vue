<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useNetworkStore } from '@stores/network';

  const networkStore = useNetworkStore();

  const { cluster, tps } = storeToRefs(networkStore);

  onMounted(() => {
    setTimeout(() => networkStore.setPerformanceMetrics(), 2000);
  });
</script>

<template>
  <div class="network-stats-container">
    <div class="network-stats-layer-base"></div>
    <div class="network-stats-layer-top">
      <h4><b>{{ cluster.toUpperCase() }}</b> | Current TPS: {{ tps }} <i class="fa-solid fa-circle blinker"></i></h4>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@components/network/NetworkStats.scss';
</style>