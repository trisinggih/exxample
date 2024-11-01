<template>
  <div>
    <BaseText
      v-if="props.label"
      as="label"
      weight="medium"
      leading="loose"
      size="sm"
      class="text-dark-500"
    >
      {{ props.label }}
      <span v-if="props.labelRequired" class="text-danger text-sm">*</span>
    </BaseText>

    <div class="w-full relative">
      <div class="absolute top-0 left-0 h-full z-[2]">
        <slot name="prefix"></slot>
      </div>

      <input
        v-model="inputModel"
        :class="inputClass"
        :placeholder="props.loading ? '' : props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly || props.loading"
        :type="props.type"
        @click="emit('click')"
      />

      <Transition
        enter-active-class="duration-300 ease-in"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-300 ease-out"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div v-if="props.loading" :class="loadingClass">
          <div class="h-3 w-9/12 rounded-md bg-slate-300 animate-pulse"></div>
        </div>
      </Transition>

      <div class="absolute top-0 right-0 h-full z-[2]">
        <slot name="suffix"></slot>
      </div>

      <Transition
        enter-active-class="duration-300 ease-in"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-300 ease-out"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div v-if="inputModel && props.clearable" :class="clearableClass">
          <button
            type="button"
            tabindex="-1"
            class="h-full aspect-square grid place-content-center text-danger cursor-pointer"
            @click="emit('clear')"
          >
            <Icon name="ph:x" class="text-xl"></Icon>
          </button>
        </div>
      </Transition>
    </div>

    <Transition
      enter-active-class="duration-300 ease-in"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-300 ease-out"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <BaseText
        v-if="props.error"
        leading="relaxed"
        size="sm"
        class="text-danger"
      >
        {{ props.error }}
      </BaseText>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any;
  loading?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  type?: string;
  label?: string;
  labelRequired?: boolean;
  placeholder?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'md' | 'lg' | 'full';
  classes?: {
    inputPadding?: string;
    inputCursor?: string;
    clearablePadding?: string;
    loadingPadding?: string;
  };
}

const emit = defineEmits(['update:modelValue', 'click', 'clear']);
const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  readonly: false,
  clearable: false,
  size: 'md',
  rounded: 'md',
});

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emit('update:modelValue', value);
  },
});

const inputClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('w-full');
  baseClass.push('text-dark');

  if (props.disabled) {
    baseClass.push('cursor-not-allowed');
  } else if (props.loading) {
    baseClass.push('cursor-progress');
  } else {
    if (props.classes?.inputCursor) {
      baseClass.push(props.classes.inputCursor);
    } else {
      baseClass.push('cursor-text');
    }
  }

  switch (props.size) {
    case 'sm':
      baseClass.push('h-8 py-1 text-sm leading-tight');
      if (props.classes?.inputPadding) {
        baseClass.push(props.classes.inputPadding);
      } else if (props.clearable) {
        baseClass.push('pl-2 pr-8');
      } else {
        baseClass.push('px-2');
      }
      break;
    case 'md':
      baseClass.push('h-10 py-2 text-base leading-tight');
      if (props.classes?.inputPadding) {
        baseClass.push(props.classes.inputPadding);
      } else if (props.clearable) {
        baseClass.push('pl-3 pr-10');
      } else {
        baseClass.push('px-3');
      }
      break;
    case 'lg':
      baseClass.push('h-12 py-2 text-lg leading-normal');
      if (props.classes?.inputPadding) {
        baseClass.push(props.classes.inputPadding);
      } else if (props.clearable) {
        baseClass.push('pl-4 pr-12');
      } else {
        baseClass.push('px-4');
      }
      break;
  }

  switch (props.rounded) {
    case 'none':
      baseClass.push('rounded-none');
      break;
    case 'md':
      baseClass.push('rounded-md');
      break;
    case 'lg':
      baseClass.push('rounded-xl');
      break;
    case 'full':
      baseClass.push('rounded-full');
      break;
  }

  if (props.error) {
    baseClass.push('border border-danger');
    baseClass.push('focus:ring-2 focus:ring-danger');
  } else {
    baseClass.push('border border-slate-300');
    baseClass.push('disabled:border-slate-200');
    baseClass.push('disabled:bg-slate-100');
    baseClass.push('focus:ring-2 focus:ring-primary');
  }

  baseClass.push('placeholder:text-slate-300 placeholder:font-light');
  baseClass.push('focus:border-transparent focus:outline-none');

  return baseClass.join(' ');
});

const clearableClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('absolute top-0 right-0 h-full');

  if (props.classes?.clearablePadding) {
    baseClass.push(props.classes.clearablePadding);
  }

  return baseClass.join(' ');
});

const loadingClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('absolute top-0 left-0 h-full w-full flex items-center');

  if (props.classes?.loadingPadding) {
    baseClass.push(props.classes.loadingPadding);
  } else {
    switch (props.size) {
      case 'sm':
        baseClass.push('px-2');
        break;
      case 'md':
        baseClass.push('px-3');
        break;
      case 'lg':
        baseClass.push('px-4');
        break;
    }
  }

  return baseClass.join(' ');
});
</script>
