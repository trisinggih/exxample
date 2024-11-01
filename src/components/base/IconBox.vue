<template>
  <div :class="boxClass">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  classes?: {
    color?: string;
    size?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  rounded: 'md',
});

const boxClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('grid place-content-center');
  baseClass.push('duration-300');

  switch (props.size) {
    case 'xs':
      baseClass.push('size-[2rem]');
      break;
    case 'sm':
      baseClass.push('size-[2.5rem]');
      break;
    case 'md':
      baseClass.push('size-[3rem]');
      break;
    case 'lg':
      baseClass.push('size-[4rem]');
      break;
    case 'xl':
      baseClass.push('size-[5rem]');
      break;
    case '2xl':
      baseClass.push('size-[6rem]');
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
      break;
    case 'success':
      baseClass.push('bg-success-50 text-success');
      break;
    case 'warning':
      baseClass.push('bg-warning-50 text-warning');
      break;
    case 'danger':
      baseClass.push('bg-danger-50 text-danger');
      break;
    case 'light':
      baseClass.push('bg-slate-100 text-slate-500');
      break;
    default:
      baseClass.push('bg-white text-slate-500');
      baseClass.push('border border-slate-200');
      break;
  }

  return baseClass.join(' ');
});
</script>
