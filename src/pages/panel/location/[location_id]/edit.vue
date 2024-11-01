<template>
  <div>
    <PanelLocationForm></PanelLocationForm>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Edit Location',
});
</script>
