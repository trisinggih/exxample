<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Employee Location">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="
              panelEmployeeLocationListStore.onFetchItemsEmployeeLocation()
            "
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelEmployeeLocationListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelEmployeeLocationListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <BaseBadge
          :show="isActiveFilter(panelEmployeeLocationListStore.inputFilter)"
          class="md:mr-auto"
        >
          <BaseButton
            block
            @click="panelEmployeeLocationListStore.isModalOpenFilter = true"
          >
            <Icon name="ph:funnel" class="text-lg"></Icon>
            <BaseText> Filter </BaseText>
          </BaseButton>
        </BaseBadge>

        <BaseButton
          v-if="panelEmployeeLocationBulkStore.isHasItemsChecked"
          color="primary"
          variant="pastel"
          class="w-full md:w-auto"
          @click="panelEmployeeLocationBulkStore.onAddItems()"
        >
          <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
          <BaseText> Edit </BaseText>
        </BaseButton>

        <BaseButton
          v-if="panelEmployeeLocationBulkStore.isHasItemsChecked"
          color="danger"
          variant="pastel"
          class="w-full md:w-auto"
          @click="panelEmployeeLocationBulkStore.onDeleteItems()"
        >
          <Icon name="ph:trash-duotone" class="text-lg"></Icon>
          <BaseText> Delete </BaseText>
        </BaseButton>
      </div>
    </div>

    <BaseTable
      :loading="panelEmployeeLocationListStore.loadingItemsEmployeeLocation"
      :is-empty="
        panelEmployeeLocationListStore.itemsEmployeeLocation.length === 0
      "
      :column-length="isUserRoles(['ADMIN', 'HR']) ? 4 : 3"
    >
      <template #heading>
        <BaseTableHeading
          v-if="isUserRoles(['ADMIN', 'HR'])"
          align="center"
          min-width="70px"
          width="70px"
        >
          <BaseCheckbox
            :model-value="panelEmployeeLocationBulkStore.isHasItemsChecked"
            @on-checked="panelEmployeeLocationBulkStore.onToggleAllChecked()"
          ></BaseCheckbox>
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Employee
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Locations
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow
          v-for="(
            obj, i
          ) in panelEmployeeLocationListStore.itemsEmployeeLocation"
          :key="i"
        >
          <BaseTableCell v-if="isUserRoles(['ADMIN', 'HR'])" align="center">
            <BaseCheckbox
              :model-value="panelEmployeeLocationBulkStore.isChecked(obj._id)"
              :value="obj._id"
              @on-checked="
                panelEmployeeLocationBulkStore.onToggleChecked(obj._id)
              "
            ></BaseCheckbox>
          </BaseTableCell>
          <BaseTableCell align="center">
            {{ panelEmployeeLocationListStore.getRowNumber(i) }}
          </BaseTableCell>
          <BaseTableCell align="left">
            <div class="flex items-center gap-3">
              <BaseAvatar
                :src="obj?.picture || getAvatarDefault(obj?.gender)"
                size="sm"
              ></BaseAvatar>
              <div class="grow">
                <BaseText size="sm" class="line-clamp-1">
                  {{ obj.full_name }}
                </BaseText>
                <BaseText size="xs" class="line-clamp-1">
                  {{ obj.employee_identity_number }}
                </BaseText>
                <div class="flex items-center flex-wrap">
                  <BaseText size="xs" weight="light" class="text-dark-400">
                    {{ obj.department_text }}
                  </BaseText>
                  <Icon name="ph:dot" class="text-dark-400 text-lg"></Icon>
                  <BaseText size="xs" weight="light" class="text-dark-400">
                    {{ obj.job_position_text }}
                  </BaseText>
                </div>
              </div>
            </div>
          </BaseTableCell>
          <BaseTableCell align="left">
            <div
              v-if="obj.location?.locations.length > 0"
              class="inline-flex flex-wrap items-center gap-1 p-2 rounded-lg hover:bg-primary-50 duration-300 cursor-pointer"
              @click="
                isUserRoles(['ADMIN', 'HR'])
                  ? panelEmployeeLocationListStore.onEditItemEmployeeLocation(
                      obj,
                      obj.location?._id,
                    )
                  : undefined
              "
            >
              <BaseChip
                v-for="(location, j) in obj.location?.locations"
                :key="j"
                size="sm"
              >
                {{ location.name }}
              </BaseChip>
            </div>
            <div
              v-else-if="isUserRoles(['ADMIN', 'HR'])"
              class="max-w-44 flex justify-center items-center gap-2 p-2 border border-dashed border-slate-200 text-dark text-sm rounded-lg hover:bg-slate-50 duration-300 cursor-pointer"
              @click="
                panelEmployeeLocationListStore.onAddItemEmployeeLocation(obj)
              "
            >
              <Icon name="ph:plus"></Icon>
              Add
            </div>
          </BaseTableCell>
        </BaseTableRow>
      </template>
    </BaseTable>

    <BasePagination
      v-model:page="panelEmployeeLocationListStore.inputPagination.page"
      v-model:per-page="panelEmployeeLocationListStore.inputPagination.per_page"
      :total-data="panelEmployeeLocationListStore.totalEmployeeLocation"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const panelEmployeeLocationListStore = usePanelEmployeeLocationListStore();
const panelEmployeeLocationBulkStore = usePanelEmployeeLocationBulkStore();

onMounted(() => {
  panelEmployeeLocationListStore.onFetchItemsEmployeeLocation();
});
</script>
