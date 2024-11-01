<template>
  <div>
    <PanelActivityList></PanelActivityList>
    <PanelActivityFilter></PanelActivityFilter>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Activity List',
});
</script>
