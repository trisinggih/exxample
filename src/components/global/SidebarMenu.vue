<template>
  <div>
    <NuxtLink
      v-if="props.item.to && !props.item.children"
      :to="props.item.to"
      :class="menuClass()"
    >
      <Icon
        :name="props.item.icon"
        :class="props.child ? 'text-lg' : 'text-xl'"
      ></Icon>
      <BaseText :size="props.child ? 'sm' : 'base'">
        {{ props.item.text }}
      </BaseText>
    </NuxtLink>

    <button v-else :class="menuClass()" @click="onOpenChildren()">
      <Icon
        :name="props.item.icon"
        :class="props.child ? 'text-lg' : 'text-xl'"
      ></Icon>
      <BaseText>
        {{ props.item.text }}
      </BaseText>
      <Icon
        name="ph:caret-down-bold"
        class="ml-auto duration-300"
        :class="{
          'rotate-180': isChildrenOpened,
        }"
      ></Icon>
    </button>

    <Transition
      enter-active-class="duration-300 ease-in"
      enter-from-class="transform opacity-0 -translate-y-5"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-300 ease-out"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-5"
      move-class="duration-300"
    >
      <div v-if="isCanShowChildren" class="pl-5 mt-2 space-y-1">
        <div v-for="(obj, i) in props.item.children" :key="i">
          <SidebarMenu :item="obj" child></SidebarMenu>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  item: any;
  child?: boolean;
}

const props = defineProps<Props>();

const menuClass = () => {
  const baseClass: string[] = [];

  baseClass.push('w-full px-4 rounded-lg');
  baseClass.push('flex items-center duration-500');

  if (props.child) {
    baseClass.push('h-10 gap-2 text-sm');
  } else {
    baseClass.push('h-11 gap-3');
  }

  if (isActiveMenu()) {
    if (props.child) {
      baseClass.push('bg-primary-50 text-primary');
    } else {
      baseClass.push('bg-primary text-white');
    }
  } else {
    baseClass.push('text-slate-500 cursor-pointer');
    baseClass.push('hover:bg-slate-50');
  }

  return baseClass.join(' ');
};

const isActiveMenu = () => {
  if (props.item.to) {
    return isActiveRoute(props.item.to);
  } else {
    return props.item.children
      .map((objChildren: any) => isActiveRoute(objChildren.to))
      .includes(true);
  }
};

const isCanShowChildren = computed(() => {
  return props.item.children && isChildrenOpened.value;
});

const isChildrenOpened = ref(false);
const onOpenChildren = () => {
  isChildrenOpened.value = !isChildrenOpened.value;
};

onMounted(() => {
  if (isActiveMenu()) {
    isChildrenOpened.value = true;
  }
});
</script>
