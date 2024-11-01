<template>
  <div></div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
});

const authStore = useAuthStore();

onMounted(() => {
  if (authStore.isLoggedIn) {
    navigateTo('/panel/dashboard');
  }
});
</script>
