<template>
  <div class="bg-slate-50 min-h-screen">
    <div
      class="bg-white border-b border-slate-200 h-14 w-full flex items-center px-5"
    >
      <BaseText weight="bold" size="lg">
        {{ runtimeConfig.public.app_name }}
      </BaseText>

      <BaseButton
        size="sm"
        class="ml-auto"
        @click="locationTokenStore.onClearToken()"
      >
        <Icon name="ph:sign-out" class="text-lg"></Icon>
        Exit
      </BaseButton>
    </div>

    <div class="p-5">
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const locationTokenStore = useLocationTokenStore();
</script>
