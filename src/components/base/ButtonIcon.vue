<template>
  <button
    :class="buttonClass"
    type="button"
    :disabled="props.loading || props.disabled"
  >
    <div
      class="absolute pointer-events-none flex justify-center items-center"
      :class="{
        'opacity-100': props.loading,
        'opacity-0': !props.loading,
      }"
    >
      <Icon name="mingcute:loading-3-fill" class="text-lg animate-spin"></Icon>
    </div>
    <div
      class="pointer-events-none flex justify-center items-center"
      :class="{
        'opacity-100': !props.loading,
        'opacity-0': props.loading,
      }"
    >
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'light';
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  classes?: {
    color?: string;
    size?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  size: 'md',
  rounded: 'md',
});

const buttonClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('inline-flex justify-center items-center');
  baseClass.push('duration-300');

  if (props.disabled) {
    baseClass.push('cursor-not-allowed');
    baseClass.push('disabled:opacity-75');
  } else if (props.loading) {
    baseClass.push('cursor-progress');
  } else {
    baseClass.push('cursor-pointer');
  }

  switch (props.size) {
    case 'sm':
      baseClass.push('size-8');
      break;
    case 'md':
      baseClass.push('size-10');
      break;
    case 'lg':
      baseClass.push('size-12');
      break;
  }

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

  switch (props.color) {
    case 'primary':
      baseClass.push('bg-primary-50 text-primary');
      baseClass.push('enabled:hover:bg-opacity-50');
      break;
    case 'success':
      baseClass.push('bg-success-50 text-success');
      baseClass.push('enabled:hover:bg-opacity-50');
      break;
    case 'warning':
      baseClass.push('bg-warning-50 text-warning');
      baseClass.push('enabled:hover:bg-opacity-50');
      break;
    case 'danger':
      baseClass.push('bg-danger-50 text-danger');
      baseClass.push('enabled:hover:bg-opacity-50');
      break;
    case 'light':
      baseClass.push('bg-slate-100 text-slate-500');
      baseClass.push('enabled:hover:bg-slate-50');
      break;
    default:
      baseClass.push('bg-white text-slate-500');
      baseClass.push('border border-slate-200');
      baseClass.push('enabled:hover:bg-slate-50');
      break;
  }

  return baseClass.join(' ');
});
</script>
