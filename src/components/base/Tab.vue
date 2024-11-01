<template>
  <div class="inline-flex bg-primary-50 gap-1 p-1 rounded-lg">
    <div
      v-for="(obj, i) in props.items"
      :key="i"
      :class="tabClass(obj)"
      @click="onSelect(obj)"
    >
      {{ obj.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any;
  size?: 'sm' | 'md';
  items: {
    text: string;
    value: any;
  }[];
}

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

const tabModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emit('update:modelValue', value);
  },
});

const onSelect = (obj: any) => {
  tabModel.value = obj.value;
};

const tabClass = (obj: any) => {
  const baseClass: string[] = [];

  baseClass.push('inline-flex justify-center items-center');
  baseClass.push('rounded-md cursor-pointer');
  baseClass.push('duration-300');

  switch (props.size) {
    case 'sm':
      baseClass.push('h-8 min-w-20 px-3');
      baseClass.push('text-sm');
      break;
    case 'md':
      baseClass.push('h-10 min-w-24 px-5');
      baseClass.push('text-base');
      break;
  }

  if (tabModel.value === obj.value) {
    baseClass.push('bg-primary text-white shadow-lg');
  } else {
    baseClass.push('text-dark');
  }

  return baseClass.join(' ');
};
</script>
