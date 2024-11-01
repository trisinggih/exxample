<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Selection List">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="panelSelectionListStore.onFetchItemsSelection()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelSelectionListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelSelectionListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <BaseBadge :show="isActiveFilter(panelSelectionListStore.inputFilter)">
          <BaseButton
            class="w-full md:w-auto"
            @click="panelSelectionListStore.isModalOpenFilter = true"
          >
            <Icon name="ph:funnel" class="text-lg"></Icon>
            <BaseText> Filter </BaseText>
          </BaseButton>
        </BaseBadge>

        <NuxtLink to="/panel/selection/add" class="md:ml-auto">
          <BaseButton color="primary" class="w-full md:w-auto">
            <Icon name="ph:plus-bold" class="text-lg"></Icon>
            <BaseText> Add </BaseText>
          </BaseButton>
        </NuxtLink>
      </div>
    </div>

    <BaseTable
      :loading="panelSelectionListStore.loadingItemsSelection"
      :is-empty="panelSelectionListStore.itemsSelection.length === 0"
      :column-length="4"
    >
      <template #heading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Type
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Text
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="150px" width="150px">
          Action
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow
          v-for="(obj, i) in panelSelectionListStore.itemsSelection"
          :key="i"
        >
          <BaseTableCell align="center">
            {{ panelSelectionListStore.getRowNumber(i) }}
          </BaseTableCell>
          <BaseTableCell align="left">
            {{ obj.type_text }}
          </BaseTableCell>
          <BaseTableCell align="left">
            {{ obj.text }}
          </BaseTableCell>
          <BaseTableCell align="center">
            <div class="inline-flex items-center gap-2">
              <BaseTooltip text="Edit">
                <NuxtLink :to="`/panel/selection/${obj._id}/edit`">
                  <BaseButtonIcon color="primary" rounded="full">
                    <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
                  </BaseButtonIcon>
                </NuxtLink>
              </BaseTooltip>

              <BaseTooltip text="Delete">
                <BaseButtonIcon
                  color="danger"
                  rounded="full"
                  @click="panelSelectionListStore.onDeleteItemSelection(obj)"
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
      v-model:page="panelSelectionListStore.inputPagination.page"
      v-model:per-page="panelSelectionListStore.inputPagination.per_page"
      :total-data="panelSelectionListStore.totalSelection"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const panelSelectionListStore = usePanelSelectionListStore();

onMounted(() => {
  panelSelectionListStore.onFetchItemsSelection();
});
</script>
