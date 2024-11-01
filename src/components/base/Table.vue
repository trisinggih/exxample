<template>
  <div :id="props.id" class="pb-5 overflow-hidden overflow-x-auto">
    <table class="w-full border-separate border-spacing-y-2">
      <thead>
        <slot name="heading"></slot>
      </thead>

      <tbody v-if="props.loading" class="cursor-progress">
        <tr v-for="i in props.rowLength" :key="i">
          <td v-for="j in props.columnLength" :key="j">
            <div
              class="block bg-slate-200 w-full h-7 rounded-lg animate-pulse"
            ></div>
          </td>
        </tr>
      </tbody>

      <tbody v-else-if="isEmpty">
        <tr>
          <td :colspan="columnLength">
            <div
              class="text-dark py-5 flex flex-col items-center justify-center"
            >
              <BaseIconBox color="primary" rounded="full" size="lg">
                <Icon
                  name="ph:magnifying-glass-duotone"
                  class="text-3xl"
                ></Icon>
              </BaseIconBox>
              <BaseText leading="loose" class="text-slate-400">
                No result
              </BaseText>
            </div>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <slot name="body"></slot>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  id?: string;
  loading?: boolean;
  isEmpty?: boolean;
  columnLength?: number;
  rowLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  id: 'table',
  columnLength: 5,
  rowLength: 10,
});
</script>

<style>
thead th:first-child {
  border-top-left-radius: 0.5rem;
}
thead th:last-child {
  border-top-right-radius: 0.5rem;
}
</style>
