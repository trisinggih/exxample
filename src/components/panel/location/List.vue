<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Location List">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="panelLocationListStore.onFetchItemsLocation()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelLocationListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelLocationListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <NuxtLink to="/location/token" target="_blank" class="md:ml-auto">
          <BaseButton>
            <Icon name="ph:scan-duotone" class="text-lg"></Icon>
            <BaseText> Scanner </BaseText>
          </BaseButton>
        </NuxtLink>

        <NuxtLink to="/panel/location/add">
          <BaseButton color="primary" class="w-full md:w-auto">
            <Icon name="ph:plus-bold" class="text-lg"></Icon>
            <BaseText> Add </BaseText>
          </BaseButton>
        </NuxtLink>
      </div>
    </div>

    <BaseTable
      :loading="panelLocationListStore.loadingItemsLocation"
      :is-empty="panelLocationListStore.itemsLocation.length === 0"
      :column-length="7"
    >
      <template #heading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Name
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Address
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="100px">
          Scan Type
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="100px">
          Max Scan Daily
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="100px">
          Token
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="150px" width="150px">
          Action
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow
          v-for="(obj, i) in panelLocationListStore.itemsLocation"
          :key="i"
        >
          <BaseTableCell align="center">
            {{ panelLocationListStore.getRowNumber(i) }}
          </BaseTableCell>
          <BaseTableCell align="left"> {{ obj.name }} </BaseTableCell>
          <BaseTableCell align="left"> {{ obj.address }} </BaseTableCell>
          <BaseTableCell align="left"> {{ obj.scan_type_text }} </BaseTableCell>
          <BaseTableCell align="left">
            <div>
              <BaseText
                as="span"
                weight="thin"
                size="sm"
                class="text-slate-400"
              >
                Shift:
              </BaseText>
              <BaseText as="span" weight="medium" size="sm" class="text-dark">
                {{ obj.max_scan_daily_shift || '-' }}
              </BaseText>
            </div>
            <div>
              <BaseText
                as="span"
                weight="thin"
                size="sm"
                class="text-slate-400"
              >
                Overtime:
              </BaseText>
              <BaseText as="span" weight="medium" size="sm" class="text-dark">
                {{ obj.max_scan_daily_shift || '-' }}
              </BaseText>
            </div>
          </BaseTableCell>
          <BaseTableCell align="left"> {{ obj.token }} </BaseTableCell>
          <BaseTableCell align="center">
            <div class="inline-flex items-center gap-2">
              <BaseTooltip text="Edit">
                <NuxtLink :to="`/panel/location/${obj._id}/edit`">
                  <BaseButtonIcon color="primary" rounded="full">
                    <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
                  </BaseButtonIcon>
                </NuxtLink>
              </BaseTooltip>

              <BaseTooltip text="Delete">
                <BaseButtonIcon
                  color="danger"
                  rounded="full"
                  @click="panelLocationListStore.onDeleteItemLocation(obj)"
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
      v-model:page="panelLocationListStore.inputPagination.page"
      v-model:per-page="panelLocationListStore.inputPagination.per_page"
      :total-data="panelLocationListStore.totalLocation"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const panelLocationListStore = usePanelLocationListStore();

onMounted(() => {
  panelLocationListStore.onFetchItemsLocation();
});
</script>
