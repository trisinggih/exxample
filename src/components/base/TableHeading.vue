<template>
  <th
    :class="headingClass"
    :style="{ width: props.width, minWidth: props.minWidth }"
  >
    <slot></slot>
  </th>
</template>

<script lang="ts" setup>
interface Props {
  align?: 'left' | 'right' | 'center';
  width?: string;
  minWidth?: string;
  stickyLeft?: boolean;
  stickyRight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  stickyLeft: false,
  stickyRight: false,
});

const headingClass = computed(() => {
  const baseClass: any[] = [];

  baseClass.push('text-sm text-dark-500 font-bold');
  baseClass.push('border-b border-slate-200');
  baseClass.push('py-3 px-3');
  baseClass.push('duration-300');
  baseClass.push('bg-slate-100');

  switch (props.align) {
    case 'left':
      baseClass.push('text-left');
      break;
    case 'right':
      baseClass.push('text-right');
      break;
    case 'center':
      baseClass.push('text-center');
      break;
  }

  if (props.stickyRight) {
    baseClass.push('md:sticky md:right-0 md:z-[2]');
    baseClass.push('md:shadow-[-10px_0_12px_-12px] md:shadow-gray-200');
  } else if (props.stickyLeft) {
    baseClass.push('md:sticky md:left-0 md:z-[2]');
    baseClass.push('md:shadow-[10px_0_12px_-12px] md:shadow-gray-200');
  }

  return baseClass.join(' ');
});
</script>
