<template>
  <div>
    <PanelSettingForm></PanelSettingForm>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Add Setting',
});
</script>
