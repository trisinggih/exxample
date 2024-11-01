<template>
  <div :class="radioClass" @click="onCheck()">
    <Icon :name="radioIcon" :class="radioIconClass"></Icon>
    <BaseText :class="radioTextClass">{{ props.text }}</BaseText>
    <input
      type="radio"
      :name="props.name"
      :value="props.modelValue"
      :checked="inputModel === props.value"
      class="hidden"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any;
  name: string;
  value: any;
  text: string;
  disabled?: boolean;
}

const emit = defineEmits(['update:modelValue']);
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

const radioIcon = computed(() => {
  return inputModel.value === props.value
    ? 'ph:radio-button-fill'
    : 'ph:radio-button-duotone';
});

const radioIconClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('text-2xl');

  if (inputModel.value === props.value) {
    baseClass.push('text-primary');
  } else {
    baseClass.push('text-slate-300');
  }

  return baseClass.join(' ');
});

const radioTextClass = computed(() => {
  const baseClass: string[] = [];

  if (inputModel.value === props.value) {
    baseClass.push('text-dark');
  } else {
    baseClass.push('text-dark-500');
  }

  return baseClass.join(' ');
});

const radioClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('inline-flex items-center gap-1');

  if (props.disabled) {
    baseClass.push('cursor-not-allowed');
  } else if (inputModel.value === props.value) {
    baseClass.push('cursor-default');
  } else {
    baseClass.push('cursor-pointer');
  }

  return baseClass.join(' ');
});

const onCheck = () => {
  inputModel.value = props.value;
};
</script>
