<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Overtime List">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="panelOvertimeListStore.onFetchItemsOvertime()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelOvertimeListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelOvertimeListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <BaseBadge
          :show="isActiveFilter(panelOvertimeListStore.inputFilter)"
          class="md:mr-auto"
        >
          <BaseButton
            class="w-full md:w-auto"
            @click="panelOvertimeListStore.isModalOpenFilter = true"
          >
            <Icon name="ph:funnel" class="text-lg"></Icon>
            <BaseText> Filter </BaseText>
          </BaseButton>
        </BaseBadge>

        <BaseButton
          v-if="panelOvertimeBulkStore.isHasItemsChecked"
          color="primary"
          variant="pastel"
          class="w-full md:w-auto"
          @click="panelOvertimeBulkStore.onAddItems()"
        >
          <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
          <BaseText> Edit </BaseText>
        </BaseButton>

        <BaseButton
          v-if="panelOvertimeBulkStore.isHasItemsChecked"
          color="danger"
          variant="pastel"
          class="w-full md:w-auto"
          @click="panelOvertimeBulkStore.onDeleteItems()"
        >
          <Icon name="ph:trash-duotone" class="text-lg"></Icon>
          <BaseText> Delete </BaseText>
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

    <div class="flex items-center bg-primary-50 p-4 gap-3 rounded-lg">
      <Icon name="ph:info-duotone" class="text-primary text-2xl"></Icon>
      <BaseText as="p" class="text-primary">
        Overtime date is same as employee shift date not the actual date
      </BaseText>
    </div>

    <BaseTable
      :loading="panelOvertimeListStore.loadingItemsOvertime"
      :is-empty="panelOvertimeListStore.itemsOvertime.length === 0"
      :column-length="isUserRoles(['ADMIN', 'SUPERVISOR']) ? 4 : 3"
    >
      <template #heading>
        <BaseTableHeading
          v-if="isUserRoles(['ADMIN', 'SUPERVISOR'])"
          align="center"
          min-width="70px"
          width="70px"
        >
          <BaseCheckbox
            :model-value="panelOvertimeBulkStore.isHasItemsChecked"
            @on-checked="panelOvertimeBulkStore.onToggleAllChecked()"
          ></BaseCheckbox>
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="300px" sticky-left>
          Employee
        </BaseTableHeading>
        <BaseTableHeading
          v-if="panelOvertimeListStore.loadingItemsOvertime"
          align="left"
          min-width="200px"
        >
        </BaseTableHeading>
        <BaseTableHeading
          v-for="date in panelOvertimeListStore.itemsColumnDate"
          v-else
          v-show="!panelOvertimeListStore.loadingItemsOvertime"
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
          v-for="(obj, i) in panelOvertimeListStore.itemsOvertime"
          :key="i"
        >
          <BaseTableCell
            v-if="isUserRoles(['ADMIN', 'SUPERVISOR'])"
            align="center"
          >
            <BaseCheckbox
              :model-value="panelOvertimeBulkStore.isChecked(obj._id)"
              :value="obj._id"
              @on-checked="panelOvertimeBulkStore.onToggleChecked(obj._id)"
            ></BaseCheckbox>
          </BaseTableCell>
          <BaseTableCell align="center">
            {{ panelOvertimeListStore.getRowNumber(i) }}
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
            v-for="date in panelOvertimeListStore.itemsColumnDate"
            :key="date"
            align="center"
          >
            <div
              v-if="getItemOvertime(obj, date) && tab === 'DATETIME'"
              class="w-full flex justify-center items-center gap-1 p-2 rounded-lg hover:bg-primary-50 duration-300 cursor-pointer"
              @click="
                isUserRoles(['ADMIN', 'SUPERVISOR'])
                  ? panelOvertimeListStore.onEditItemOvertime(
                      obj,
                      date,
                      getItemOvertime(obj, date)?._id,
                    )
                  : undefined
              "
            >
              <BaseTooltip
                :show="getItemOvertime(obj, date)?.start_at"
                :text="
                  dayjs
                    .tz(getItemOvertime(obj, date)?.start_at)
                    .tz(getItemOvertime(obj, date)?.timezone)
                    .format('DD MMMM YYYY, HH:mm')
                "
              >
                <BaseChip size="sm">
                  {{
                    getItemOvertime(obj, date)?.start_at
                      ? dayjs
                          .tz(getItemOvertime(obj, date)?.start_at)
                          .tz(getItemOvertime(obj, date)?.timezone)
                          .format('HH:mm')
                      : '--:--'
                  }}
                </BaseChip>
              </BaseTooltip>
              <BaseTooltip
                :show="getItemOvertime(obj, date)?.end_at"
                :text="
                  dayjs
                    .tz(getItemOvertime(obj, date)?.end_at)
                    .tz(getItemOvertime(obj, date)?.timezone)
                    .format('DD MMMM YYYY, HH:mm')
                "
              >
                <BaseChip size="sm">
                  {{
                    getItemOvertime(obj, date)?.end_at
                      ? dayjs
                          .tz(getItemOvertime(obj, date)?.end_at)
                          .tz(getItemOvertime(obj, date)?.timezone)
                          .format('HH:mm')
                      : '--:--'
                  }}
                </BaseChip>
              </BaseTooltip>
            </div>

            <div
              v-else-if="getItemOvertime(obj, date) && tab === 'DURATION'"
              class="w-full flex justify-center items-center gap-1 p-2 rounded-lg hover:bg-primary-50 duration-300 cursor-pointer"
              @click="
                isUserRoles(['ADMIN', 'SUPERVISOR'])
                  ? panelOvertimeListStore.onEditItemOvertime(
                      obj,
                      date,
                      getItemOvertime(obj, date)?._id,
                    )
                  : undefined
              "
            >
              {{
                getItemOvertime(obj, date)?.duration
                  ? dayjs
                      .duration(getItemOvertime(obj, date)?.duration)
                      .format('HH:mm:ss')
                  : '0h'
              }}
            </div>

            <div
              v-else-if="isUserRoles(['ADMIN', 'SUPERVISOR'])"
              class="w-full flex justify-center items-center gap-2 p-2 border border-dashed border-slate-200 text-dark text-sm rounded-lg hover:bg-slate-50 duration-300 cursor-pointer"
              @click="panelOvertimeListStore.onAddItemOvertime(obj, date)"
            >
              <Icon name="ph:plus"></Icon>
              Add
            </div>
          </BaseTableCell>
        </BaseTableRow>
      </template>
    </BaseTable>

    <BasePagination
      v-model:page="panelOvertimeListStore.inputPagination.page"
      v-model:per-page="panelOvertimeListStore.inputPagination.per_page"
      :total-data="panelOvertimeListStore.totalOvertime"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const { dayjs } = useNuxtApp();

const panelOvertimeListStore = usePanelOvertimeListStore();
const panelOvertimeBulkStore = usePanelOvertimeBulkStore();

const getItemOvertime = (obj: any, date: string) => {
  return panelOvertimeListStore.getItemOvertime(obj, date);
};

const tab = ref('DATETIME');

onMounted(() => {
  panelOvertimeListStore.onSetItemsColumnDate();
  panelOvertimeListStore.onFetchItemsOvertime();
});
</script>
