<template>
  <div :class="avatarClass">
    <div
      v-if="props.loading"
      class="h-full w-full object-cover bg-slate-100 animate-pulse"
    ></div>
    <img
      v-else
      :src="props.src"
      alt="avatar"
      class="h-full w-full object-cover hover:scale-110 duration-300"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  src?: string;
  loading?: boolean;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  loading: false,
});

const avatarClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('aspect-square rounded-full');
  baseClass.push('overflow-hidden');

  switch (props.size) {
    case 'xxs':
      baseClass.push('w-6 min-w-6');
      break;
    case 'xs':
      baseClass.push('w-8 min-w-8');
      break;
    case 'sm':
      baseClass.push('w-10 min-w-10');
      break;
    case 'md':
      baseClass.push('w-12 min-w-12');
      break;
    case 'lg':
      baseClass.push('w-16 min-w-16');
      break;
    case 'xl':
      baseClass.push('w-20 min-w-20');
      break;
    case '2xl':
      baseClass.push('w-24 min-w-24');
      break;
    case '3xl':
      baseClass.push('w-28 min-w-28');
      break;
    case '4xl':
      baseClass.push('w-32 min-w-32');
      break;
  }

  return baseClass.join(' ');
});
</script>
