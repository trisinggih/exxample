<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Attendance List">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="panelAttendanceListStore.onFetchItemsAttendance()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelAttendanceListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelAttendanceListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <BaseBadge
          :show="isActiveFilter(panelAttendanceListStore.inputFilter)"
          class="md:mr-auto"
        >
          <BaseButton
            class="w-full md:w-auto"
            @click="panelAttendanceListStore.isModalOpenFilter = true"
          >
            <Icon name="ph:funnel" class="text-lg"></Icon>
            <BaseText> Filter </BaseText>
          </BaseButton>
        </BaseBadge>

        <BaseButton
          v-if="panelAttendanceBulkStore.isHasItemsChecked"
          color="primary"
          variant="pastel"
          class="w-full md:w-auto"
          @click="panelAttendanceBulkStore.onAddItems()"
        >
          <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
          <BaseText> Edit </BaseText>
        </BaseButton>

        <BaseButton
          v-if="panelAttendanceBulkStore.isHasItemsChecked"
          color="danger"
          variant="pastel"
          class="w-full md:w-auto"
          @click="panelAttendanceBulkStore.onDeleteItems()"
        >
          <Icon name="ph:trash-duotone" class="text-lg"></Icon>
          <BaseText> Delete </BaseText>
        </BaseButton>

        <BaseButton
          v-if="isUserRoles(['ADMIN', 'OWNER', 'HR'])"
          color="primary"
          variant="outline"
          class="w-full md:w-auto"
          :loading="panelAttendanceListStore.loadingReportAttendance"
          @click="panelAttendanceListStore.onReportAttendance()"
        >
          <Icon name="ph:download-simple" class="text-lg"></Icon>
          <BaseText> Download Report </BaseText>
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
            text: 'Status',
            value: 'STATUS',
          },
          {
            text: 'Duration',
            value: 'DURATION',
          },
        ]"
      ></BaseTab>
    </div>

    <BaseTable
      :loading="panelAttendanceListStore.loadingItemsAttendance"
      :is-empty="panelAttendanceListStore.itemsAttendance.length === 0"
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
            :model-value="panelAttendanceBulkStore.isHasItemsChecked"
            @on-checked="panelAttendanceBulkStore.onToggleAllChecked()"
          ></BaseCheckbox>
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="300px" sticky-left>
          Employee
        </BaseTableHeading>
        <BaseTableHeading
          v-if="panelAttendanceListStore.loadingItemsAttendance"
          align="left"
          min-width="200px"
        >
        </BaseTableHeading>
        <BaseTableHeading
          v-for="date in panelAttendanceListStore.itemsColumnDate"
          v-else
          v-show="!panelAttendanceListStore.loadingItemsAttendance"
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
          v-for="(obj, i) in panelAttendanceListStore.itemsAttendance"
          :key="i"
        >
          <BaseTableCell v-if="isUserRoles(['ADMIN', 'HR'])" align="center">
            <BaseCheckbox
              :model-value="panelAttendanceBulkStore.isChecked(obj._id)"
              :value="obj._id"
              @on-checked="panelAttendanceBulkStore.onToggleChecked(obj._id)"
            ></BaseCheckbox>
          </BaseTableCell>
          <BaseTableCell align="center">
            {{ panelAttendanceListStore.getRowNumber(i) }}
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
            v-for="date in panelAttendanceListStore.itemsColumnDate"
            :key="date"
            align="center"
          >
            <div
              v-if="getItemAttendance(obj, date) && tab === 'DATETIME'"
              class="w-full flex justify-center items-center gap-1 p-2 rounded-lg hover:bg-primary-50 duration-300 cursor-pointer"
              @click="
                isUserRoles(['ADMIN', 'HR'])
                  ? panelAttendanceListStore.onEditItemAttendance(
                      obj,
                      date,
                      getItemAttendance(obj, date)?._id,
                    )
                  : undefined
              "
            >
              <BaseTooltip
                :show="getItemAttendance(obj, date)?.start_at"
                :text="
                  dayjs
                    .tz(getItemAttendance(obj, date)?.start_at)
                    .tz(getItemAttendance(obj, date)?.timezone)
                    .format('DD MMMM YYYY, HH:mm')
                "
              >
                <BaseChip
                  :color="
                    getItemAttendance(obj, date)?.status === 'ABSENT'
                      ? 'danger'
                      : getItemAttendance(obj, date)?.start_at
                        ? undefined
                        : 'warning'
                  "
                  size="sm"
                >
                  {{
                    getItemAttendance(obj, date)?.start_at
                      ? dayjs
                          .tz(getItemAttendance(obj, date)?.start_at)
                          .tz(getItemAttendance(obj, date)?.timezone)
                          .format('HH:mm')
                      : '--:--'
                  }}
                </BaseChip>
              </BaseTooltip>
              <BaseTooltip
                :show="getItemAttendance(obj, date)?.end_at"
                :text="
                  dayjs
                    .tz(getItemAttendance(obj, date)?.end_at)
                    .tz(getItemAttendance(obj, date)?.timezone)
                    .format('DD MMMM YYYY, HH:mm')
                "
              >
                <BaseChip
                  :color="
                    getItemAttendance(obj, date)?.status === 'ABSENT'
                      ? 'danger'
                      : getItemAttendance(obj, date)?.end_at
                        ? undefined
                        : 'warning'
                  "
                  size="sm"
                >
                  {{
                    getItemAttendance(obj, date)?.end_at
                      ? dayjs
                          .tz(getItemAttendance(obj, date)?.end_at)
                          .tz(getItemAttendance(obj, date)?.timezone)
                          .format('HH:mm')
                      : '--:--'
                  }}
                </BaseChip>
              </BaseTooltip>
            </div>

            <div
              v-else-if="getItemAttendance(obj, date) && tab === 'STATUS'"
              class="w-full flex justify-center items-center gap-1 p-2 rounded-lg hover:bg-primary-50 duration-300 cursor-pointer"
              @click="
                isUserRoles(['ADMIN', 'HR'])
                  ? panelAttendanceListStore.onEditItemAttendance(
                      obj,
                      date,
                      getItemAttendance(obj, date)?._id,
                    )
                  : undefined
              "
            >
              <BaseChip
                :color="getItemAttendance(obj, date)?.status_color"
                size="sm"
              >
                {{ getItemAttendance(obj, date)?.status_text }}
              </BaseChip>
            </div>

            <div
              v-else-if="getItemAttendance(obj, date) && tab === 'DURATION'"
              class="w-full flex justify-center items-center gap-1 p-2 rounded-lg hover:bg-primary-50 duration-300 cursor-pointer"
              @click="
                isUserRoles(['ADMIN', 'HR'])
                  ? panelAttendanceListStore.onEditItemAttendance(
                      obj,
                      date,
                      getItemAttendance(obj, date)?._id,
                    )
                  : undefined
              "
            >
              {{
                getItemAttendance(obj, date)?.duration
                  ? valueToWorkDuration(getItemAttendance(obj, date))
                  : '-'
              }}
            </div>

            <div
              v-else-if="isUserRoles(['ADMIN', 'HR'])"
              class="w-full flex justify-center items-center gap-2 p-2 border border-dashed border-slate-200 text-dark text-sm rounded-lg hover:bg-slate-50 duration-300 cursor-pointer"
              @click="panelAttendanceListStore.onAddItemAttendance(obj, date)"
            >
              <Icon name="ph:plus"></Icon>
              Add
            </div>
          </BaseTableCell>
        </BaseTableRow>
      </template>
    </BaseTable>

    <BasePagination
      v-model:page="panelAttendanceListStore.inputPagination.page"
      v-model:per-page="panelAttendanceListStore.inputPagination.per_page"
      :total-data="panelAttendanceListStore.totalAttendance"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const { dayjs } = useNuxtApp();

const panelAttendanceListStore = usePanelAttendanceListStore();
const panelAttendanceBulkStore = usePanelAttendanceBulkStore();

const getItemAttendance = (obj: any, date: string) => {
  return panelAttendanceListStore.getItemAttendance(obj, date);
};

const tab = ref('DATETIME');

onMounted(() => {
  panelAttendanceListStore.onSetItemsColumnDate();
  panelAttendanceListStore.onFetchItemsAttendance();
});
</script>
