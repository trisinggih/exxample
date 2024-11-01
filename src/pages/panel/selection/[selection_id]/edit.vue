<template>
  <div>
    <PanelSelectionForm></PanelSelectionForm>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Edit Selection',
});
</script>
