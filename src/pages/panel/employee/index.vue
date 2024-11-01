<template>
  <div>
    <PanelEmployeeList></PanelEmployeeList>
    <PanelEmployeeFilter></PanelEmployeeFilter>
    <PanelEmployeeImport></PanelEmployeeImport>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Employee List',
});
</script>
