<template>
  <div class="flex items-center gap-2">
    <div v-for="(obj, i) in props.items" :key="i">
      {{ obj.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  items: {
    text: string;
    to?: string;
    icon?: string;
  }[];
}

const props = defineProps<Props>();
</script>
