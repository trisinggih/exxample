<template>
  <BaseModal
    v-model="panelDashboardTotalEmployeeLocationStore.isModalOpenDetail"
    title="Detail Employee Location"
    :classes="{
      modal: 'w-11/12 md:w-8/12',
    }"
  >
    <div class="space-y-2 my-5">
      <div class="flex flex-col lg:flex-row gap-3">
        <BaseInput
          v-model="inputSearch"
          placeholder="Search"
          size="sm"
          clearable
          :classes="{
            inputPadding: 'pl-8 pr-8',
          }"
          @clear="inputSearch = null"
        >
          <template #prefix>
            <div class="input-prefix-icon">
              <Icon name="ph:magnifying-glass-duotone" class="text-lg"></Icon>
            </div>
          </template>
        </BaseInput>
      </div>

      <BaseTable
        :loading="
          panelDashboardTotalEmployeeLocationStore.loadingItemsDetailEmployeeLocation
        "
        :is-empty="itemsDetailEmployeeLocationFiltered.length === 0"
        :column-length="2"
      >
        <template #heading>
          <BaseTableHeading align="left" min-width="200px">
            Job Position
          </BaseTableHeading>
          <BaseTableHeading align="right" min-width="150px">
            Total
          </BaseTableHeading>
        </template>

        <template #body>
          <BaseTableRow
            v-for="(obj, i) in itemsDetailEmployeeLocationFiltered"
            :key="i"
          >
            <BaseTableCell
              align="left"
              :classes="{ padding: 'pt-1 pb-2 px-2' }"
            >
              {{ obj.text }}
            </BaseTableCell>
            <BaseTableCell
              align="right"
              :classes="{ padding: 'pt-1 pb-2 px-2' }"
            >
              <span
                :class="{
                  'text-slate-400 font-thin': obj.count === 0,
                  'text-dark font-medium': obj.count > 0,
                }"
              >
                {{ obj.count || '' }}
              </span>
            </BaseTableCell>
          </BaseTableRow>
        </template>
      </BaseTable>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
const panelDashboardTotalEmployeeLocationStore =
  usePanelDashboardTotalEmployeeLocationStore();

const inputSearch = ref(null as any);

const itemsDetailEmployeeLocationFiltered = computed(() => {
  return panelDashboardTotalEmployeeLocationStore.itemsDetailEmployeeLocation?.filter(
    (obj: any) => {
      if (inputSearch.value) {
        return obj.text.toLowerCase().includes(inputSearch.value.toLowerCase());
      } else {
        return true;
      }
    },
  );
});
</script>
