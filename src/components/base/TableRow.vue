<template>
  <tr :class="rowClass">
    <slot></slot>
  </tr>
</template>

<script lang="ts" setup>
const rowClass = computed(() => {
  const baseClass: any[] = [];

  baseClass.push('duration-300 group/table');
  baseClass.push('hover:shadow-[0_3px_25px_-5px]');
  baseClass.push('hover:shadow-gray-200');
  baseClass.push('hover:delay-300');

  return baseClass.join(' ');
});
</script>
