<template>
  <div :class="cardClass">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  rounded?: 'md' | 'lg' | 'xl';
  bordered?: boolean;
  flat?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  rounded: 'md',
  bordered: false,
  flat: true,
});

const cardClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('bg-white');
  baseClass.push('flex flex-col');

  if (props.flat) {
    baseClass.push('shadow-none');
  } else {
    baseClass.push('shadow-[0_0_40px_-10px] shadow-gray-300');
  }

  if (props.bordered) {
    baseClass.push('border border-slate-200');
  } else {
    baseClass.push('border-none');
  }

  switch (props.rounded) {
    case 'md':
      baseClass.push('rounded-lg');
      break;
    case 'lg':
      baseClass.push('rounded-xl');
      break;
    case 'xl':
      baseClass.push('rounded-2xl');
      break;
  }

  return baseClass.join(' ');
});
</script>
