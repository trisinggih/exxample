<template>
  <div class="w-full min-h-screen bg-slate-50 flex relative">
    <div
      class="bg-white border-r border-slate-200 flex flex-col fixed h-full lg:w-72 min-w-72 -translate-x-72 lg:translate-x-0 duration-300 z-[99]"
      :class="{
        'w-full translate-x-0': isOpened,
      }"
    >
      <div class="h-14 min-h-14 w-full flex items-center px-5">
        <slot name="sidebar-top"></slot>

        <div v-if="isOpened" class="ml-auto">
          <BaseButtonIcon rounded="full" @click="onClose()">
            <Icon name="ph:x-bold"></Icon>
          </BaseButtonIcon>
        </div>
      </div>

      <div class="space-y-2 grow overflow-y-auto">
        <slot name="sidebar-menu"></slot>
      </div>
    </div>

    <div class="grow flex flex-col lg:pl-72 overflow-hidden duration-300">
      <div
        class="bg-white border-b border-slate-200 fixed h-14 w-full lg:w-[calc(100%-18rem)] flex items-center px-5 z-[98]"
      >
        <div v-if="!isOpened" class="block lg:hidden">
          <BaseButtonIcon rounded="full" @click="onOpen()">
            <Icon name="ph:list-bold"></Icon>
          </BaseButtonIcon>
        </div>

        <slot name="navbar"></slot>
      </div>

      <div class="px-5 py-20">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const isOpened = ref(false);

const onOpen = () => {
  isOpened.value = true;
};

const onClose = () => {
  isOpened.value = false;
};

const routeFullPath = computed(() => {
  return route.fullPath;
});
watchDeep(routeFullPath, () => {
  onClose();
});
</script>
