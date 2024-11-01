<template>
  <div>
    <PanelEmployeeForm></PanelEmployeeForm>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Edit Employee',
});
</script>
