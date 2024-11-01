<template>
  <div>
    <PanelShiftForm></PanelShiftForm>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Add Shift',
});
</script>
