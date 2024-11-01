<template>
  <button
    :class="buttonClass"
    :type="props.type"
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
      class="pointer-events-none flex items-center gap-2"
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
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'light';
  variant?: 'solid' | 'outline' | 'pastel';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'md' | 'lg' | 'full';
  classes?: {
    color?: string;
    size?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  loading: false,
  disabled: false,
  block: false,
  variant: 'solid',
  size: 'md',
  rounded: 'md',
});

const buttonClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('relative flex flex-nowrap justify-center items-center');
  baseClass.push('ease-in duration-200');

  if (props.block) {
    baseClass.push('w-full');
  } else {
    baseClass.push('min-w-16');
  }

  if (props.disabled) {
    baseClass.push('cursor-not-allowed');
    baseClass.push('disabled:opacity-75');
  } else if (props.loading) {
    baseClass.push('cursor-progress');
  } else {
    baseClass.push('cursor-pointer');
  }

  if (props.classes?.size) {
    baseClass.push(props.classes.size);
  } else {
    switch (props.size) {
      case 'sm':
        baseClass.push('h-8 py-1 px-3 text-sm leading-tight');
        break;
      case 'md':
        baseClass.push('h-10 py-2 px-5 text-base leading-tight');
        break;
      case 'lg':
        baseClass.push('h-12 py-2 px-6 text-lg leading-normal');
        break;
    }
  }

  switch (props.rounded) {
    case 'none':
      baseClass.push('rounded-none');
      break;
    case 'md':
      baseClass.push('rounded-md');
      break;
    case 'lg':
      baseClass.push('rounded-xl');
      break;
    case 'full':
      baseClass.push('rounded-full');
      break;
  }

  if (props.classes?.color) {
    baseClass.push(props.classes.color);
  } else {
    switch (props.variant) {
      case 'solid':
        switch (props.color) {
          case 'primary':
            baseClass.push('bg-primary text-white');
            baseClass.push('enabled:hover:bg-primary-600');
            break;
          case 'success':
            baseClass.push('bg-success text-white');
            baseClass.push('enabled:hover:bg-success-400');
            break;
          case 'warning':
            baseClass.push('bg-warning text-white');
            baseClass.push('enabled:hover:bg-warning-400');
            break;
          case 'danger':
            baseClass.push('bg-danger text-white');
            baseClass.push('enabled:hover:bg-danger-400');
            break;
          case 'light':
            baseClass.push('bg-slate-100 text-slate-500');
            baseClass.push('enabled:hover:bg-slate-50');
            break;
          default:
            baseClass.push('bg-white text-dark');
            baseClass.push('border border-slate-300');
            baseClass.push('enabled:hover:bg-slate-50');
            baseClass.push('enabled:hover:border-slate-200');
            break;
        }
        break;
      case 'outline':
        switch (props.color) {
          case 'primary':
            baseClass.push('border border-primary text-primary');
            baseClass.push('enabled:hover:bg-primary');
            baseClass.push('enabled:hover:text-white');
            break;
          case 'success':
            baseClass.push('border border-success text-success');
            baseClass.push('enabled:hover:bg-success');
            baseClass.push('enabled:hover:text-white');
            break;
          case 'warning':
            baseClass.push('border border-warning text-warning');
            baseClass.push('enabled:hover:bg-warning');
            baseClass.push('enabled:hover:text-white');
            break;
          case 'danger':
            baseClass.push('border border-danger text-danger');
            baseClass.push('enabled:hover:bg-danger');
            baseClass.push('enabled:hover:text-white');
            break;
          case 'light':
            baseClass.push('border border-slate-200 text-slate-200');
            baseClass.push('enabled:hover:bg-slate-200');
            baseClass.push('enabled:hover:text-white');
            break;
          default:
            baseClass.push('border border-slate-400 text-slate-400');
            baseClass.push('enabled:hover:bg-slate-400');
            baseClass.push('enabled:hover:text-white');
            break;
        }
        break;
      case 'pastel':
        switch (props.color) {
          case 'primary':
            baseClass.push('bg-primary-50 text-primary');
            baseClass.push('enabled:hover:bg-primary-100');
            break;
          case 'success':
            baseClass.push('bg-success-50 text-success');
            baseClass.push('enabled:hover:bg-success-100');
            break;
          case 'warning':
            baseClass.push('bg-warning-50 text-warning');
            baseClass.push('enabled:hover:bg-warning-100');
            break;
          case 'danger':
            baseClass.push('bg-danger-50 text-danger');
            baseClass.push('enabled:hover:bg-danger-100');
            break;
          case 'light':
            baseClass.push('bg-slate-100 text-slate-500');
            baseClass.push('enabled:hover:bg-slate-200');
            break;
          default:
            baseClass.push('bg-slate-100 text-dark');
            baseClass.push('enabled:hover:bg-slate-50');
            break;
        }
        break;
    }
  }

  return baseClass.join(' ');
});
</script>
