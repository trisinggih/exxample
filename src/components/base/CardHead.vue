<template>
  <div :class="cardHeadClass">
    <BaseButtonIcon v-if="props.buttonBack" rounded="full" @click="onBack()">
      <Icon name="ph:arrow-left-bold"></Icon>
    </BaseButtonIcon>

    <h1 :class="titleClass">
      {{ props.title }}
    </h1>

    <div class="ml-auto flex items-center gap-2">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string;
  size?: 'sm' | 'md';
  buttonBack?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

const router = useRouter();

const onBack = () => {
  router.back();
};

const cardHeadClass = computed(() => {
  const baseClass: any[] = [];

  baseClass.push('w-full flex gap-3 lg:gap-4 items-center');
  baseClass.push('shadow-gray-200');
  baseClass.push('duration-300');

  if (props.size === 'sm') {
    baseClass.push('h-12 shadow-[0_25px_18px_-22px]');
  } else if (props.size === 'md') {
    baseClass.push('h-14 shadow-[0_25px_20px_-25px]');
  }

  return baseClass.join(' ');
});

const titleClass = computed(() => {
  const baseClass: any[] = [];

  baseClass.push('text-dark line-clamp-1');

  if (props.size === 'sm') {
    baseClass.push('font-semibold');
  } else if (props.size === 'md') {
    baseClass.push('text-lg font-bold');
  }

  return baseClass.join(' ');
});
</script>
