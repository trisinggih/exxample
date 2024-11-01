<template>
  <div class="flex flex-col items-start">
    <BaseText
      as="label"
      weight="medium"
      leading="loose"
      size="sm"
      class="text-dark-500"
    >
      {{ props.label }}
    </BaseText>

    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  label: string;
}

const props = defineProps<Props>();
</script>
