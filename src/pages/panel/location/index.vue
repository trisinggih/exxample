<template>
  <div>
    <PanelLocationList></PanelLocationList>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Location List',
});
</script>
