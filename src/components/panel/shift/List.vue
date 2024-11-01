<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Shift List">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="panelShiftListStore.onFetchItemsShift()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelShiftListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelShiftListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <NuxtLink to="/panel/shift/add" class="md:ml-auto">
          <BaseButton color="primary" class="w-full md:w-auto">
            <Icon name="ph:plus-bold" class="text-lg"></Icon>
            <BaseText> Add </BaseText>
          </BaseButton>
        </NuxtLink>
      </div>
    </div>

    <BaseTable
      :loading="panelShiftListStore.loadingItemsShift"
      :is-empty="panelShiftListStore.itemsShift.length === 0"
      :column-length="5"
    >
      <template #heading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Name
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Start Time
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          End Time
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="150px" width="150px">
          Action
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow
          v-for="(obj, i) in panelShiftListStore.itemsShift"
          :key="i"
        >
          <BaseTableCell align="center">
            {{ i + 1 }}
          </BaseTableCell>
          <BaseTableCell align="left"> {{ obj.name }} </BaseTableCell>
          <BaseTableCell align="left"> {{ obj.start_time }} </BaseTableCell>
          <BaseTableCell align="left"> {{ obj.end_time }} </BaseTableCell>
          <BaseTableCell align="center">
            <div class="inline-flex items-center gap-2">
              <BaseTooltip text="Edit">
                <NuxtLink :to="`/panel/shift/${obj._id}/edit`">
                  <BaseButtonIcon color="primary" rounded="full">
                    <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
                  </BaseButtonIcon>
                </NuxtLink>
              </BaseTooltip>

              <BaseTooltip text="Delete">
                <BaseButtonIcon
                  color="danger"
                  rounded="full"
                  @click="panelShiftListStore.onDeleteItemShift(obj)"
                >
                  <Icon name="ph:trash-duotone" class="text-lg"></Icon>
                </BaseButtonIcon>
              </BaseTooltip>
            </div>
          </BaseTableCell>
        </BaseTableRow>
      </template>
    </BaseTable>

    <BasePagination
      v-model:page="panelShiftListStore.inputPagination.page"
      v-model:per-page="panelShiftListStore.inputPagination.per_page"
      :total-data="panelShiftListStore.totalShift"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const panelShiftListStore = usePanelShiftListStore();

onMounted(() => {
  panelShiftListStore.onFetchItemsShift();
});
</script>
