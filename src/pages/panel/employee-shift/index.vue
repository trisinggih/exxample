<template>
  <div>
    <PanelEmployeeShiftList></PanelEmployeeShiftList>
    <PanelEmployeeShiftFilter></PanelEmployeeShiftFilter>
    <PanelEmployeeShiftForm></PanelEmployeeShiftForm>
    <PanelEmployeeShiftBulk></PanelEmployeeShiftBulk>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Employee Shift List',
});
</script>
