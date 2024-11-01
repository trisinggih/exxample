<template>
  <LayoutSidebar>
    <template #navbar>
      <DropdownLoggedInUser class="ml-auto"></DropdownLoggedInUser>
    </template>

    <template #sidebar-top>
      <BaseText weight="bold" size="xl">
        {{ runtimeConfig.public.app_name }}
      </BaseText>
    </template>

    <template #sidebar-menu>
      <div
        class="flex items-center space-x-3 p-2.5 mx-5 my-2.5 bg-primary-50 rounded-xl"
      >
        <BaseAvatar
          :src="
            authStore.user?.picture || getAvatarDefault(authStore.user.gender)
          "
          class="border-2 border-white"
        ></BaseAvatar>
        <div>
          <BaseText leading="snug" weight="medium" class="line-clamp-1">
            {{ authStore.user?.name }}
          </BaseText>
          <BaseText size="xs" class="text-dark-400 line-clamp-1">
            {{ authStore.user?.role_text }}
          </BaseText>
        </div>
      </div>

      <div class="space-y-1 px-5 py-2.5">
        <SidebarMenu
          v-for="(obj, i) in itemsPanelSidebarMenu()"
          :key="i"
          :item="obj"
        ></SidebarMenu>
      </div>
    </template>

    <template #default>
      <slot></slot>
    </template>
  </LayoutSidebar>
</template>

<script lang="ts" setup>
import { itemsPanelSidebarMenu } from '~/consts/sidebar-menu';

const runtimeConfig = useRuntimeConfig();

const authStore = useAuthStore();
const settingStore = useSettingStore();

onMounted(() => {
  settingStore.onFetchItemSetting();
});
</script>
