<template>
  <div>
    <PanelAttendanceList></PanelAttendanceList>
    <PanelAttendanceFilter></PanelAttendanceFilter>
    <PanelAttendanceForm></PanelAttendanceForm>
    <PanelAttendanceBulk></PanelAttendanceBulk>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Attendance List',
});
</script>
