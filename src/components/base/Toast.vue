<template>
  <div class="flex justify-center">
    <div
      class="fixed z-[9999]"
      :class="{
        'p-3': toastStore.toasts.length > 0,
        'p-0': toastStore.toasts.length === 0,
      }"
    >
      <TransitionGroup
        enter-active-class="duration-300 ease-in"
        enter-from-class="transform opacity-0 -translate-y-5 scale-90"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="duration-300 ease-out absolute"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="transform opacity-0 -translate-y-5 scale-90"
        move-class="duration-300"
        tag="div"
        class="flex flex-col justify-center items-center gap-3"
      >
        <div
          v-for="(obj, i) in toastStore.toasts"
          :key="obj.key"
          :class="toastClass(obj)"
        >
          <div class="size-12 grid place-content-center">
            <Icon :name="toastIcon(obj)" class="text-2xl"></Icon>
          </div>

          <div class="grow pt-3">
            <BaseText>
              {{ obj.message }}
            </BaseText>
          </div>

          <button
            class="rounded-lg size-12 grid place-content-center ml-auto cursor-pointer"
            @click="toastStore.close(i)"
          >
            <Icon name="ph:x" class="text-xl"></Icon>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toastStore = useToastStore();

const toastIcon = (obj: any) => {
  switch (obj.color) {
    case 'success':
      return 'ph:check-circle-duotone';
    case 'danger':
      return 'ph:warning-duotone';
    default:
      return 'ph:info-duotone';
  }
};

const toastClass = (obj: any) => {
  const baseClass: any[] = [];

  baseClass.push('flex justify-center');
  baseClass.push('bg-opacity-80 backdrop-blur-sm');
  baseClass.push('min-w-96 max-w-2/3 min-h-12');
  baseClass.push('rounded-lg select-none');

  switch (obj.color) {
    case 'success':
      baseClass.push('bg-success text-white');
      break;
    case 'danger':
      baseClass.push('bg-danger text-white');
      break;
    default:
      baseClass.push('bg-primary-50 text-primary');
      break;
  }

  return baseClass.join(' ');
};
</script>
