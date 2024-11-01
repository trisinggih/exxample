<template>
  <div>
    <PanelEmployeeLocationList></PanelEmployeeLocationList>
    <PanelEmployeeLocationFilter></PanelEmployeeLocationFilter>
    <PanelEmployeeLocationForm></PanelEmployeeLocationForm>
    <PanelEmployeeLocationBulk></PanelEmployeeLocationBulk>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Employee Location List',
});
</script>
