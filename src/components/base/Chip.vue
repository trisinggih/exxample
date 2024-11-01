<template>
  <div :class="chipClass">
    <div :class="contentClass">
      <slot></slot>
    </div>

    <div
      v-if="props.clearable"
      class="flex items-center justify-center cursor-pointer px-1.5 h-6 -ml-1.5"
      @click="emit('clear')"
    >
      <Icon name="ph:x-bold" class="text-sm"></Icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  color?: 'primary' | 'success' | 'warning' | 'danger';
  colorHex?: string;
  size?: 'sm' | 'md';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  clearable?: boolean;
}

const emit = defineEmits(['clear']);
const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  rounded: 'md',
  clearable: false,
});

const chipClass = computed(() => {
  const baseClass: any[] = [];

  baseClass.push('min-w-12 max-w-36 line-clamp-1');
  baseClass.push('inline-flex justify-center items-center');
  baseClass.push('text-sm rounded-full duration-300');

  switch (props.rounded) {
    case 'none':
      baseClass.push('rounded-none');
      break;
    case 'sm':
      baseClass.push('rounded-sm');
      break;
    case 'md':
      baseClass.push('rounded-md');
      break;
    case 'lg':
      baseClass.push('rounded-lg');
      break;
    case 'full':
      baseClass.push('rounded-full');
      break;
  }

  if (props.colorHex) {
    baseClass.push('bg-[--bg-color] text-[--text-color]');
    baseClass.push('border border-[--border-color]');
  } else {
    switch (props.color) {
      case 'primary':
        baseClass.push('bg-primary-50 text-primary');
        baseClass.push('border border-primary');
        break;
      case 'success':
        baseClass.push('bg-success-50 text-success');
        baseClass.push('border border-success');
        break;
      case 'warning':
        baseClass.push('bg-warning-50 text-warning');
        baseClass.push('border border-warning');
        break;
      case 'danger':
        baseClass.push('bg-danger-50 text-danger');
        baseClass.push('border border-danger');
        break;
      default:
        baseClass.push('bg-white text-slate-500');
        baseClass.push('border border-slate-200');
        break;
    }
  }

  return baseClass.join(' ');
});

const contentClass = computed(() => {
  const baseClass: string[] = [];

  switch (props.size) {
    case 'sm':
      baseClass.push('py-1 px-2 text-xs');
      break;
    case 'md':
      baseClass.push('py-1.5 px-3');
      break;
  }

  return baseClass.join(' ');
});
</script>
