<template>
  <div class="flex w-full grow flex-col gap-5 lg:flex-row">
    <div class="w-full lg:w-3/12">
      <BaseButtonIcon
        rounded="full"
        class="lg:hidden"
        @click="showMenu = !showMenu"
      >
        <Icon
          name="ph:caret-down-bold"
          class="duration-300"
          :class="{
            'rotate-180': showMenu,
          }"
        ></Icon>
      </BaseButtonIcon>

      <Transition
        enter-active-class="duration-300 ease-in"
        enter-from-class="opacity-0 -translate-y-5"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="duration-300 ease-out absolute"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-5"
        move-class="duration-300"
      >
        <div
          v-if="showMenu"
          class="mt-4 rounded-xl border border-dashed border-slate-200 p-3 lg:hidden"
        >
          <slot name="tab-menu"></slot>
        </div>
      </Transition>

      <div class="hidden lg:block">
        <slot name="tab-menu"></slot>
      </div>
    </div>
    <div class="w-full lg:w-9/12">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const showMenu = ref(true);
</script>
