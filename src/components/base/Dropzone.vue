<template>
  <div
    ref="dropzone"
    class="flex flex-col space-y-1 justify-center items-center w-full h-56 rounded-lg border-2 border-dashed border-slate-200 duration-300 group/dropzone"
    :class="{
      'bg-primary-50': isOverDropZone,
      'cursor-pointer hover:bg-primary-50': !isOverDropZone,
    }"
    @click="emits('onClick')"
  >
    <Icon
      name="ph:cloud-arrow-up-light"
      class="text-4xl duration-300"
      :class="{
        'text-primary': isOverDropZone,
        'text-dark-400 group-hover/dropzone:text-primary': !isOverDropZone,
      }"
    ></Icon>
    <BaseText align="center" size="sm" class="text-dark-400">
      Drop files to upload
    </BaseText>
    <BaseText align="center" size="sm" weight="medium" class="text-dark-400">
      OR
    </BaseText>
    <BaseChip size="sm"> Select files </BaseChip>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  extension?: string[];
  mimetype?: string[];
}

const emits = defineEmits(['onDrop', 'onClick']);
const props = defineProps<Props>();

const dropzone = ref();

const { isOverDropZone } = useDropZone(dropzone, {
  onDrop: (files: File[] | null) => {
    emits('onDrop', files);
  },
});
</script>
