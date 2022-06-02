<script setup lang="ts">
</script>

<template>
  <div class="view-container">
    <div class="init-padding"></div>
    <div class="analysis-container">
      <div class="analysis-title">
        <h2>Coming Soon</h2>
      </div>
    </div>
    <div class="bottom-padding"></div>
  </div>
</template>

<style lang="scss">
  @import '@views/styles/Shared.scss';
  @import '@views/styles/AllocationAnalysis.scss';

  .analysis-title {
    padding: 0.5rem;
    align-items: center;
    margin-bottom: 1.5rem;
    border-radius: 1rem;
    border: 2px solid var(--color-brand-title);
    box-shadow: 0px 6px 3px -3px var(--color-brand-title);
  }
</style>