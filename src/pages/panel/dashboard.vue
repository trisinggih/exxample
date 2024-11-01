<template>
  <div class="space-y-5">
    <PanelDashboardTotalAttendance></PanelDashboardTotalAttendance>
    <PanelDashboardTotalEmployeeLocation></PanelDashboardTotalEmployeeLocation>
    <PanelDashboardTotalEmployeeLocationDetail></PanelDashboardTotalEmployeeLocationDetail>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5"></div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Dashboard',
});
</script>
