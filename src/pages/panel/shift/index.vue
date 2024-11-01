<template>
  <div>
    <PanelShiftList></PanelShiftList>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Shift List',
});
</script>
