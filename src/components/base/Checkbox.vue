<template>
  <div :class="checkboxClass" @click="onCheck()">
    <Icon :name="checkboxIcon" :class="checkboxIconClass"></Icon>
    <BaseText :class="checkboxTextClass">{{ props.text }}</BaseText>
    <input type="checkbox" class="hidden" :checked="inputModel" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: boolean;
  text?: string;
  disabled?: boolean;
}

const emit = defineEmits(['update:modelValue', 'onChecked']);
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emit('update:modelValue', value);
  },
});

const checkboxIcon = computed(() => {
  return inputModel.value ? 'ph:check-square-duotone' : 'ph:square';
});

const checkboxIconClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('text-2xl');

  if (inputModel.value) {
    baseClass.push('text-primary');
  } else {
    baseClass.push('text-slate-300');
  }

  return baseClass.join(' ');
});

const checkboxTextClass = computed(() => {
  const baseClass: string[] = [];

  if (inputModel.value) {
    baseClass.push('text-dark');
  } else {
    baseClass.push('text-dark-500');
  }

  return baseClass.join(' ');
});

const checkboxClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('inline-flex items-center gap-1');

  if (props.disabled) {
    baseClass.push('cursor-not-allowed');
  } else {
    baseClass.push('cursor-pointer');
  }

  return baseClass.join(' ');
});

const onCheck = () => {
  emit('onChecked', inputModel.value);
};
</script>
