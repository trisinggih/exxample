<template>
  <div v-if="props.items.length === 0">
    <div class="text-dark h-20 flex items-center justify-center">No result</div>
  </div>

  <div
    v-else-if="props.items.length > 0 && $slots.item"
    class="flex flex-col space-y-1 p-2"
  >
    <div v-for="(obj, i) in props.items" :key="i">
      <slot
        name="item"
        :item="obj"
        :on-select-item="onSelectItem"
        :is-selected="isSelected"
        :list-item-class="listItemClass"
      ></slot>
    </div>
  </div>

  <div v-else class="flex flex-col space-y-1 p-2">
    <div
      v-for="(obj, i) in props.items"
      :key="i"
      :class="listItemClass(obj)"
      @click="onSelectItem(obj)"
    >
      {{ obj[props.itemText] }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any;
  items: any[];
  itemText?: string;
  itemValue?: string;
  multiple?: boolean;
}

const emit = defineEmits(['update:modelValue', 'onSelect']);
const props = withDefaults(defineProps<Props>(), {
  itemText: 'text',
  itemValue: 'value',
  multiple: false,
});

const isSelected = (obj: any) => {
  if (props.multiple) {
    return props.modelValue?.includes(obj[props.itemValue]);
  } else {
    return obj[props.itemValue] === props.modelValue;
  }
};

const onSelectItem = (obj: any) => {
  if (props.multiple) {
    const values = props.modelValue || [];
    const index = values.findIndex((val: any) => {
      return val === obj[props.itemValue];
    });

    if (index === -1) {
      values.push(obj[props.itemValue]);
    } else {
      values.splice(index, 1);
    }

    emit('update:modelValue', values);
    emit('onSelect');
  } else {
    emit('update:modelValue', obj[props.itemValue]);
    emit('onSelect');
  }
};

const listItemClass = (obj: any) => {
  const baseClass: string[] = [];

  baseClass.push('min-h-10 w-full flex items-center px-3 py-1.5 rounded-lg');
  baseClass.push('text-sm duration-300');
  baseClass.push('cursor-pointer');

  if (isSelected(obj)) {
    baseClass.push('bg-primary-50 text-primary');
  } else {
    baseClass.push('hover:bg-slate-100 hover:bg-opacity-40');
  }

  return baseClass.join(' ');
};
</script>
