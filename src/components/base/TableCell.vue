<template>
  <td ref="cell" :class="cellClass">
    <slot></slot>
  </td>
</template>

<script lang="ts" setup>
interface Props {
  tableId?: string;
  align?: 'left' | 'right' | 'center';
  stickyLeft?: boolean;
  stickyRight?: boolean;
  classes?: {
    padding?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  tableId: 'table',
  align: 'left',
  stickyLeft: false,
  stickyRight: false,
});

const cell = ref();

const cellClass = computed(() => {
  const baseClass: any[] = [];

  baseClass.push('text-sm text-dark');
  baseClass.push('border-b border-slate-200');
  baseClass.push('duration-300');
  baseClass.push('group-hover/table:py-5');
  baseClass.push('group-hover/table:border-transparent');
  baseClass.push('group-hover/table:delay-300');

  if (props.classes?.padding) {
    baseClass.push(props.classes?.padding);
  } else {
    baseClass.push('px-3 pt-2 pb-4');
  }

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
    baseClass.push('md:sticky md:right-0 z-[2]');
    baseClass.push('md:bg-white');
    baseClass.push('md:shadow-[-10px_0_12px_-12px] md:shadow-gray-200');
  } else if (props.stickyLeft) {
    baseClass.push('md:sticky md:left-0 z-[2]');
    baseClass.push('md:bg-white');
    baseClass.push('md:shadow-[10px_0_12px_-12px] md:shadow-gray-200');
  }

  return baseClass.join(' ');
});
</script>
