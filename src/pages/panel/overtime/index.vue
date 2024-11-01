<template>
  <div>
    <PanelOvertimeList></PanelOvertimeList>
    <PanelOvertimeFilter></PanelOvertimeFilter>
    <PanelOvertimeForm></PanelOvertimeForm>
    <PanelOvertimeBulk></PanelOvertimeBulk>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Overtime List',
});
</script>
