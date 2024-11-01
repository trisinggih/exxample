<template>
  <div>
    <PanelUserForm></PanelUserForm>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'Add User',
});
</script>
