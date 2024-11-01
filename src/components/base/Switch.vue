<template>
  <div class="inline-flex items-center">
    <div :class="inputClass" @click="onToggleSwitch()">
      <div :class="circleClass"></div>
    </div>
    <span
      v-if="props.textTrue && props.textFalse"
      class="ml-2 text-dark dark:text-white"
    >
      {{ inputModel ? props.textTrue : props.textFalse }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any;
  disabled?: boolean;
  textTrue?: string;
  textFalse?: string;
}

const emits = defineEmits(['update:modelValue']);
const props = defineProps<Props>();

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emits('update:modelValue', value);
  },
});

const inputClass = computed(() => {
  const baseClass: any[] = [];

  baseClass.push('w-14 p-1 overflow-hidden');
  baseClass.push('inline-flex items-center rounded-full overflow-hidden');

  if (inputModel.value) {
    baseClass.push('bg-primary-100');
  } else {
    baseClass.push('bg-slate-100');
  }

  if (props.disabled) {
    baseClass.push('cursor-not-allowed');
  } else {
    baseClass.push('cursor-pointer');
  }

  return baseClass.join(' ');
});

const circleClass = computed(() => {
  const baseClass: any[] = [];

  baseClass.push('h-5 rounded-full transition-all duration-300');

  if (inputModel.value) {
    baseClass.push('ml-auto');
    baseClass.push('bg-primary');
  } else {
    baseClass.push('bg-slate-400');
  }

  if (isClicked.value) {
    baseClass.push('w-full');
  } else {
    baseClass.push('w-5');
  }

  return baseClass.join(' ');
});

const isClicked = ref(false);
const onToggleSwitch = () => {
  if (props.disabled) {
    return;
  }

  isClicked.value = true;
  setTimeout(() => {
    isClicked.value = false;
  }, 150);
  setTimeout(() => {
    inputModel.value = !inputModel.value;
  }, 150);
};
</script>
