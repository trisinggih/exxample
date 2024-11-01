<template>
  <div class="inline-block">
    <input
      ref="inputFile"
      type="file"
      class="hidden"
      :accept="props.accept?.join(',')"
      @change="onSelect($event)"
    />

    <slot
      :preview="preview"
      :on-drop="onDrop"
      :on-open="onOpen"
      :on-remove="onRemove"
    ></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any;
  multiple?: boolean;
  accept?: string[];
}

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(), {
  multiple: false,
});

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emits('update:modelValue', value);
  },
});

const inputFile = ref();

const preview = computed(() => {
  if (props.multiple) {
    return inputModel.value.map((obj: any) => {
      if (inputModel.value instanceof File) {
        return URL.createObjectURL(obj);
      } else {
        return obj;
      }
    });
  } else {
    if (inputModel.value instanceof File) {
      return URL.createObjectURL(inputModel.value);
    } else {
      return inputModel.value;
    }
  }
});

const onDrop = (files: File[] | null) => {
  if (files && files.length > 0) {
    if (props.multiple) {
      inputModel.value.push(files);
    } else {
      inputModel.value = files[0];
    }
  }
};

const onOpen = () => {
  inputFile.value.click();
};

const onSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    if (props.multiple) {
      inputModel.value.push(input.files);
    } else {
      inputModel.value = input.files[0];
    }
  }
};

const onRemove = (index?: number) => {
  if (props.multiple) {
    inputModel.value.splice(index, index);
  } else {
    inputModel.value = null;
  }
};
</script>
