<template>
  <div class="relative z-[2]">
    <slot></slot>
    <div v-if="show" :class="positionClass">
      <div class="relative flex">
        <div :class="pingClass"></div>
        <div :class="dotClass">
          <span v-if="props.text" :class="textClass">
            {{ props.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  color?: 'primary' | 'success' | 'warning' | 'danger';
  text?: string;
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  show: true,
});

const dotClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('relative inline-flex justify-center items-center');
  baseClass.push('rounded-full shadow-md text-white text-xs duration-300');

  if (props.text) {
    baseClass.push('h-5 min-h-5 min-w-5 px-1.5');
  } else {
    baseClass.push('w-3 min-w-3 aspect-square');
  }

  if (props.color === 'primary') {
    baseClass.push('bg-primary');
  } else if (props.color === 'success') {
    baseClass.push('bg-success');
  } else if (props.color === 'warning') {
    baseClass.push('bg-warning');
  } else if (props.color === 'danger') {
    baseClass.push('bg-danger');
  }

  return baseClass.join(' ');
});

const pingClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('absolute inline-flex');
  baseClass.push('h-full w-full bg-opacity-75 rounded-full');
  baseClass.push('duration-300 animate-ping ');

  if (props.color === 'primary') {
    baseClass.push('bg-primary');
  } else if (props.color === 'success') {
    baseClass.push('bg-success');
  } else if (props.color === 'warning') {
    baseClass.push('bg-warning');
  } else if (props.color === 'danger') {
    baseClass.push('bg-danger');
  }

  return baseClass.join(' ');
});

const textClass = computed(() => {
  const baseClass: string[] = [];

  if (props.text && props.text.length > 2) {
    baseClass.push('text-[10px] -mr-0.5');
  } else {
    baseClass.push('text-xs');
  }

  return baseClass.join(' ');
});

const positionClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('absolute pointer-events-none');

  if (props.text) {
    baseClass.push('-top-1 left-[100%] -translate-x-3/4');
  } else {
    baseClass.push('-top-0.5 -right-0.5');
  }

  return baseClass.join(' ');
});
</script>
