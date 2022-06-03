<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useNetworkStore } from '@stores/network';

  const networkStore = useNetworkStore();

  const { cluster, tps } = storeToRefs(networkStore);

  const stable = ref(true);

  function isNetworkStable() {
    if (tps.value < 1300) {
      console.log('here', tps);
      stable.value = false;
    } else {
      stable.value = true;
    }
  }

  onMounted(() => {
    setTimeout(async () => { 
      await networkStore.setPerformanceMetrics();
      isNetworkStable();
    }, 2000);
  });
</script>

<template>
  <div class="network-stats-container">
    <div class="network-stats-layer-base"></div>
    <div class="network-stats-layer-top">
      <h4 v-if="stable"><b>{{ cluster.toUpperCase() }}</b> | Current TPS: {{ tps }} <i class="fa-solid fa-circle blinker-okay"></i></h4>
      <h4 v-else><b>{{ cluster.toUpperCase() }}</b> | Current TPS: {{ tps }} <i class="fa-solid fa-circle blinker-warn"></i></h4>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@components/network/NetworkStats.scss';
</style>