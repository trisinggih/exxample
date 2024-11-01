<template>
  <div class="group/tooltip relative">
    <slot></slot>
    <div v-if="props.show" :class="tooltipClass">
      {{ props.text }}
      <div :class="arrowClass"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  position?: 'top' | 'bottom' | 'left' | 'right';
  show?: boolean;
  text: string;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  show: true,
});

const tooltipClass = computed(() => {
  const baseClass: any[] = [];

  baseClass.push('absolute invisible opacity-0 duration-300 delay-200 z-[50]');
  baseClass.push('bg-dark text-white text-nowrap text-xs px-3 py-2 rounded-lg');
  baseClass.push('group-hover/tooltip:visible');
  baseClass.push('group-hover/tooltip:opacity-100');

  if (props.position === 'top') {
    baseClass.push('left-1/2 top-0');
    baseClass.push('-translate-x-1/2 -translate-y-[100%]');
    baseClass.push('group-hover/tooltip:-translate-y-[calc(100%+10px)]');
  }
  if (props.position === 'bottom') {
    baseClass.push('left-1/2 bottom-0');
    baseClass.push('-translate-x-1/2 translate-y-[100%]');
    baseClass.push('group-hover/tooltip:translate-y-[calc(100%+10px)]');
  }
  if (props.position === 'left') {
    baseClass.push('top-1/2 left-0');
    baseClass.push('-translate-y-1/2 -translate-x-[100%]');
    baseClass.push('group-hover/tooltip:-translate-x-[calc(100%+10px)]');
  }
  if (props.position === 'right') {
    baseClass.push('top-1/2 right-0');
    baseClass.push('-translate-y-1/2 translate-x-[100%]');
    baseClass.push('group-hover/tooltip:translate-x-[calc(100%+10px)]');
  }

  return baseClass.join(' ');
});

const arrowClass = computed(() => {
  if (!props.show) {
    return 'absolute';
  }

  const baseClass: any[] = [];

  baseClass.push('absolute w-0 h-0');

  if (props.position === 'top') {
    baseClass.push('top-[calc(100%-1px)] left-1/2 -translate-x-1/2');
    baseClass.push('border-l-[7px] border-l-transparent');
    baseClass.push('border-t-[7px] border-t-dark');
    baseClass.push('border-r-[7px] border-r-transparent');
  }
  if (props.position === 'bottom') {
    baseClass.push('bottom-[calc(100%-1px)] left-1/2 -translate-x-1/2');
    baseClass.push('border-l-[7px] border-l-transparent');
    baseClass.push('border-b-[7px] border-b-dark');
    baseClass.push('border-r-[7px] border-r-transparent');
  }
  if (props.position === 'left') {
    baseClass.push('left-[calc(100%-1px)] top-1/2 -translate-y-1/2');
    baseClass.push('border-t-[7px] border-t-transparent');
    baseClass.push('border-l-[7px] border-l-dark');
    baseClass.push('border-b-[7px] border-b-transparent');
  }
  if (props.position === 'right') {
    baseClass.push('right-[calc(100%-1px)] top-1/2 -translate-y-1/2');
    baseClass.push('border-t-[7px] border-t-transparent');
    baseClass.push('border-r-[7px] border-r-dark');
    baseClass.push('border-b-[7px] border-b-transparent');
  }

  return baseClass.join(' ');
});
</script>
