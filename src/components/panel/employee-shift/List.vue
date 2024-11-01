<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Employee Shift">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="panelEmployeeShiftListStore.onFetchItemsEmployeeShift()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelEmployeeShiftListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelEmployeeShiftListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <BaseBadge
          :show="isActiveFilter(panelEmployeeShiftListStore.inputFilter)"
          class="md:mr-auto"
        >
          <BaseButton
            block
            @click="panelEmployeeShiftListStore.isModalOpenFilter = true"
          >
            <Icon name="ph:funnel" class="text-lg"></Icon>
            <BaseText> Filter </BaseText>
          </BaseButton>
        </BaseBadge>

        <BaseButton
          v-if="panelEmployeeShiftBulkStore.isHasItemsChecked"
          color="primary"
          variant="pastel"
          class="w-full md:w-auto"
          @click="panelEmployeeShiftBulkStore.onAddItems()"
        >
          <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
          <BaseText> Edit </BaseText>
        </BaseButton>

        <BaseButton
          v-if="panelEmployeeShiftBulkStore.isHasItemsChecked"
          color="danger"
          variant="pastel"
          class="w-full md:w-auto"
          @click="panelEmployeeShiftBulkStore.onDeleteItems()"
        >
          <Icon name="ph:trash-duotone" class="text-lg"></Icon>
          <BaseText> Delete </BaseText>
        </BaseButton>

        <BaseButton
          v-if="isUserRoles(['ADMIN', 'OWNER', 'HR'])"
          color="primary"
          variant="outline"
          class="w-full md:w-auto"
          :loading="panelEmployeeShiftListStore.loadingExportEmployeeShift"
          @click="panelEmployeeShiftListStore.onExportEmployeeShift()"
        >
          <Icon name="ph:download-simple" class="text-lg"></Icon>
          <BaseText> Export </BaseText>
        </BaseButton>
      </div>
    </div>

    <div>
      <BaseTab
        v-model="tab"
        size="sm"
        :items="[
          {
            text: 'Datetime',
            value: 'DATETIME',
          },
          {
            text: 'Duration',
            value: 'DURATION',
          },
        ]"
      ></BaseTab>
    </div>

    <BaseTable
      :loading="panelEmployeeShiftListStore.loadingItemsEmployeeShift"
      :is-empty="panelEmployeeShiftListStore.itemsEmployeeShift.length === 0"
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
            :model-value="panelEmployeeShiftBulkStore.isHasItemsChecked"
            @on-checked="panelEmployeeShiftBulkStore.onToggleAllChecked()"
          ></BaseCheckbox>
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="300px" sticky-left>
          Employee
        </BaseTableHeading>
        <BaseTableHeading
          v-if="panelEmployeeShiftListStore.loadingItemsEmployeeShift"
          align="left"
          min-width="200px"
        >
        </BaseTableHeading>
        <BaseTableHeading
          v-for="date in panelEmployeeShiftListStore.itemsColumnDate"
          v-else
          v-show="!panelEmployeeShiftListStore.loadingItemsEmployeeShift"
          :key="date"
          align="center"
          min-width="150px"
          width="150px"
        >
          {{ getDateFormat(date, 'short') }}
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow
          v-for="(obj, i) in panelEmployeeShiftListStore.itemsEmployeeShift"
          :key="i"
        >
          <BaseTableCell v-if="isUserRoles(['ADMIN', 'HR'])" align="center">
            <BaseCheckbox
              :model-value="panelEmployeeShiftBulkStore.isChecked(obj._id)"
              :value="obj._id"
              @on-checked="panelEmployeeShiftBulkStore.onToggleChecked(obj._id)"
            ></BaseCheckbox>
          </BaseTableCell>
          <BaseTableCell align="center">
            {{ panelEmployeeShiftListStore.getRowNumber(i) }}
          </BaseTableCell>
          <BaseTableCell align="left" sticky-left>
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
          <BaseTableCell
            v-for="date in panelEmployeeShiftListStore.itemsColumnDate"
            :key="date"
            align="center"
          >
            <div
              v-if="getShift(obj, date) && tab === 'DATETIME'"
              class="w-full flex justify-center items-center gap-1 p-2 rounded-lg hover:bg-primary-50 duration-300 cursor-pointer"
              @click="
                isUserRoles(['ADMIN', 'HR'])
                  ? panelEmployeeShiftListStore.onEditItemEmployeeShift(
                      obj,
                      date,
                      getShift(obj, date)?._id,
                    )
                  : undefined
              "
            >
              <BaseTooltip
                :text="
                  dayjs
                    .tz(getShift(obj, date)?.start_at)
                    .tz(getShift(obj, date)?.timezone)
                    .format('DD MMMM YYYY, HH:mm')
                "
              >
                <BaseChip size="sm">
                  {{
                    getShift(obj, date)?.start_at
                      ? dayjs
                          .tz(getShift(obj, date)?.start_at)
                          .tz(getShift(obj, date)?.timezone)
                          .format('HH:mm')
                      : '--:--'
                  }}
                </BaseChip>
              </BaseTooltip>
              <BaseTooltip
                :text="
                  dayjs
                    .tz(getShift(obj, date)?.end_at)
                    .tz(getShift(obj, date)?.timezone)
                    .format('DD MMMM YYYY, HH:mm')
                "
              >
                <BaseChip size="sm">
                  {{
                    getShift(obj, date)?.end_at
                      ? dayjs
                          .tz(getShift(obj, date)?.end_at)
                          .tz(getShift(obj, date)?.timezone)
                          .format('HH:mm')
                      : '--:--'
                  }}
                </BaseChip>
              </BaseTooltip>
            </div>

            <div
              v-else-if="getShift(obj, date) && tab === 'DURATION'"
              class="w-full flex justify-center items-center gap-1 p-2 rounded-lg hover:bg-primary-50 duration-300 cursor-pointer"
              @click="
                isUserRoles(['ADMIN', 'SUPERVISOR'])
                  ? panelEmployeeShiftListStore.onEditItemEmployeeShift(
                      obj,
                      date,
                      getShift(obj, date)?._id,
                    )
                  : undefined
              "
            >
              {{
                getShift(obj, date)?.duration
                  ? dayjs
                      .duration(getShift(obj, date)?.duration)
                      .format('HH:mm:ss')
                  : '0h'
              }}
            </div>

            <div
              v-else-if="isUserRoles(['ADMIN', 'HR'])"
              class="w-full flex justify-center items-center gap-2 p-2 border border-dashed border-slate-200 text-dark text-sm rounded-lg hover:bg-slate-50 duration-300 cursor-pointer"
              @click="
                panelEmployeeShiftListStore.onAddItemEmployeeShift(obj, date)
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
      v-model:page="panelEmployeeShiftListStore.inputPagination.page"
      v-model:per-page="panelEmployeeShiftListStore.inputPagination.per_page"
      :total-data="panelEmployeeShiftListStore.totalEmployeeShift"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const { dayjs } = useNuxtApp();

const panelEmployeeShiftListStore = usePanelEmployeeShiftListStore();
const panelEmployeeShiftBulkStore = usePanelEmployeeShiftBulkStore();

const getShift = (obj: any, date: string) => {
  return panelEmployeeShiftListStore.getShift(obj, date);
};

const tab = ref('DATETIME');

onMounted(() => {
  panelEmployeeShiftListStore.onSetItemsColumnDate();
  panelEmployeeShiftListStore.onFetchItemsEmployeeShift();
});
</script>
