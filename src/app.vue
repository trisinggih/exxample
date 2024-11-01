<template>
  <div class="relative select-none">
    <div id="modal"></div>
    <BaseToast></BaseToast>
    <BaseDialog></BaseDialog>

    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

useHead({
  title: runtimeConfig.public.app_name,
});
</script>
