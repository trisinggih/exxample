<template>
  <div>
    <PanelSelectionList></PanelSelectionList>
    <PanelSelectionFilter></PanelSelectionFilter>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Selection List',
});
</script>
