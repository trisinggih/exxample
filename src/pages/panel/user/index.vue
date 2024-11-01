<template>
  <div>
    <PanelUserList></PanelUserList>
    <PanelUserFilter></PanelUserFilter>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
  middleware: ['auth'],
});

useHead({
  title: 'User List',
});
</script>
