<template>
  <BaseDropdown :classes="{ dropdown: 'w-64 p-4 space-y-3' }">
    <template #activator="{ isOpen, onOpen, onClose }">
      <BaseButton rounded="full" @click="isOpen ? onClose() : onOpen()">
        <div class="flex items-center space-x-3 w-auto -ml-3.5 -mr-2">
          <BaseAvatar
            :src="
              authStore.user?.picture || getAvatarDefault(authStore.user.gender)
            "
            size="xs"
          ></BaseAvatar>

          <BaseText size="sm">
            {{ authStore.user?.name }}
          </BaseText>

          <Icon
            :name="isOpen ? 'ph:caret-up-bold' : 'ph:caret-down-bold'"
          ></Icon>
        </div>
      </BaseButton>
    </template>

    <div class="flex justify-center">
      <BaseAvatar
        :src="
          authStore.user?.picture || getAvatarDefault(authStore.user.gender)
        "
        size="lg"
      ></BaseAvatar>
    </div>

    <div>
      <BaseText leading="relaxed" align="center">
        {{ authStore.user?.name }}
      </BaseText>
      <BaseText size="xs" align="center" class="text-dark-400">
        {{ authStore.user?.role_text }}
      </BaseText>
    </div>

    <BaseButton size="sm" color="danger" block @click="authStore.onLogout()">
      Logout
    </BaseButton>
  </BaseDropdown>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();

const itemMenuClass = (to: any) => {
  const baseClass: any[] = [];

  baseClass.push('w-full h-10 px-3');
  baseClass.push('flex items-center gap-3');
  baseClass.push('rounded-lg  duration-500');

  if (isActiveRoute(to)) {
    baseClass.push('bg-primary-50 text-primary');
  } else {
    baseClass.push('text-slate-500 cursor-pointer');
    baseClass.push('hover:bg-slate-200 hover:bg-opacity-50');
  }

  return baseClass.join(' ');
};
</script>
