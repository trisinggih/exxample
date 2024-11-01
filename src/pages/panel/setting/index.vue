<template>
  <div>
    <PanelSettingList></PanelSettingList>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Setting List',
});
</script>
