<template>
  <component :is="props.as" :class="textClass">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
interface Props {
  as?: 'div' | 'span' | 'label' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  weight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
  leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  align?: 'left' | 'right' | 'center';
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  size: 'base',
  weight: 'normal',
  leading: 'normal',
  align: 'left',
});

const textClass = computed(() => {
  const baseClass: string[] = [];

  switch (props.size) {
    case 'xs':
      baseClass.push('text-xs');
      break;
    case 'sm':
      baseClass.push('text-sm');
      break;
    case 'base':
      baseClass.push('text-base');
      break;
    case 'lg':
      baseClass.push('text-lg');
      break;
    case 'xl':
      baseClass.push('text-xl');
      break;
    case '2xl':
      baseClass.push('text-2xl');
      break;
    case '3xl':
      baseClass.push('text-3xl');
      break;
    case '4xl':
      baseClass.push('text-4xl');
      break;
    case '5xl':
      baseClass.push('text-5xl');
      break;
    case '6xl':
      baseClass.push('text-6xl');
      break;
    case '7xl':
      baseClass.push('text-7xl');
      break;
    case '8xl':
      baseClass.push('text-8xl');
      break;
    case '9xl':
      baseClass.push('text-9xl');
      break;
  }

  switch (props.weight) {
    case 'thin':
      baseClass.push('font-thin');
      break;
    case 'extralight':
      baseClass.push('font-extralight');
      break;
    case 'light':
      baseClass.push('font-light');
      break;
    case 'normal':
      baseClass.push('font-normal');
      break;
    case 'medium':
      baseClass.push('font-medium');
      break;
    case 'semibold':
      baseClass.push('font-semibold');
      break;
    case 'bold':
      baseClass.push('font-bold');
      break;
    case 'extrabold':
      baseClass.push('font-extrabold');
      break;
    case 'black':
      baseClass.push('font-black');
      break;
  }

  switch (props.leading) {
    case 'none':
      baseClass.push('leading-none');
      break;
    case 'tight':
      baseClass.push('leading-tight');
      break;
    case 'snug':
      baseClass.push('leading-snug');
      break;
    case 'normal':
      baseClass.push('leading-normal');
      break;
    case 'relaxed':
      baseClass.push('leading-relaxed');
      break;
    case 'loose':
      baseClass.push('leading-loose');
      break;
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

  return baseClass.join(' ');
});
</script>
