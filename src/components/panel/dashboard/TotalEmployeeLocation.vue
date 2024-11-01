<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Total Employee in Location">
      <template #action>
        <BaseDropdown :classes="{ dropdown: 'min-w-80 h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseTooltip text="Choose date" class="block md:hidden">
              <BaseButtonIcon
                rounded="full"
                @click="isOpen ? onClose() : onOpen()"
              >
                <Icon name="ph:calendar-blank-duotone"></Icon>
              </BaseButtonIcon>
            </BaseTooltip>

            <BaseInput
              :model-value="
                getDateFormat(
                  panelDashboardTotalEmployeeLocationStore.inputFilter.date,
                  'full',
                )
              "
              size="sm"
              placeholder="Choose date"
              readonly
              class="hidden md:block"
              :classes="{
                inputPadding: 'pl-3 pr-10',
                inputCursor: 'cursor-pointer',
              }"
              @click="isOpen ? onClose() : onOpen()"
            >
              <template #suffix>
                <div
                  class="input-suffix-icon cursor-pointer"
                  @click="isOpen ? onClose() : onOpen()"
                >
                  <Icon name="ph:calendar-blank-duotone"></Icon>
                </div>
              </template>
            </BaseInput>
          </template>
          <template #default="{ onClose }">
            <BaseDatepicker
              v-model="
                panelDashboardTotalEmployeeLocationStore.inputFilter.date
              "
              @on-select="onClose()"
            ></BaseDatepicker>
          </template>
        </BaseDropdown>

        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="
              panelDashboardTotalEmployeeLocationStore.onFetchItemsTotalEmployeeLocation()
            "
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <BaseTable
      :loading="
        panelDashboardTotalEmployeeLocationStore.loadingItemsTotalEmployeeLocation
      "
      :is-empty="
        panelDashboardTotalEmployeeLocationStore.itemsTotalEmployeeLocation
          .length === 0
      "
      :column-length="4"
    >
      <template #heading>
        <BaseTableHeading align="left" min-width="200px">
          Location
        </BaseTableHeading>
        <BaseTableHeading align="right" min-width="150px" width="150px">
          Total Present
        </BaseTableHeading>
        <BaseTableHeading align="right" min-width="150px" width="150px">
          Total In
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="100px" width="100px">
          Action
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow
          v-for="(
            obj, i
          ) in panelDashboardTotalEmployeeLocationStore.itemsTotalEmployeeLocation"
          :key="i"
        >
          <BaseTableCell align="left"> {{ obj.name }} </BaseTableCell>
          <BaseTableCell align="right">
            <span
              :class="{
                'text-slate-400 font-thin': obj.count_employee === 0,
                'text-dark font-medium': obj.count_employee > 0,
              }"
            >
              {{ obj.count_employee || '' }}
            </span>
          </BaseTableCell>
          <BaseTableCell align="right">
            <span
              :class="{
                'text-slate-400 font-thin': obj.count_in === 0,
                'text-dark font-medium': obj.count_in > 0,
              }"
            >
              {{ obj.count_in || '' }}
            </span>
          </BaseTableCell>
          <BaseTableCell align="center">
            <div class="inline-flex items-center gap-2">
              <BaseTooltip text="Detail">
                <BaseButtonIcon
                  rounded="full"
                  @click="
                    panelDashboardTotalEmployeeLocationStore.onOpenModalDetail(
                      obj._id,
                    )
                  "
                >
                  <Icon
                    name="ph:magnifying-glass-duotone"
                    class="text-lg"
                  ></Icon>
                </BaseButtonIcon>
              </BaseTooltip>
            </div>
          </BaseTableCell>
        </BaseTableRow>
      </template>
    </BaseTable>
  </BaseCard>
</template>

<script lang="ts" setup>
const settingStore = useSettingStore();
const panelDashboardTotalEmployeeLocationStore =
  usePanelDashboardTotalEmployeeLocationStore();

const dashboardIntervalRealtimeSecond = ref(null as any);
const onSetDashboardIntervalRealtimeSecond = () => {
  dashboardIntervalRealtimeSecond.value = null;
  setTimeout(() => {
    const intervalRealtimeSecond =
      settingStore.itemSetting['DASHBOARD_INTERVAL_REALTIME_SECOND'];

    if (intervalRealtimeSecond) {
      dashboardIntervalRealtimeSecond.value = +intervalRealtimeSecond * 1000;
    }
  }, 1000);
};

watch(dashboardIntervalRealtimeSecond, () => {
  clearInterval(intervalFetchData.value);
  setIntervalFetchData();
});

const intervalFetchData = ref();
const setIntervalFetchData = () => {
  intervalFetchData.value = setInterval(() => {
    panelDashboardTotalEmployeeLocationStore.onFetchItemsTotalEmployeeLocation(
      true,
    );
  }, dashboardIntervalRealtimeSecond.value);
};

onMounted(() => {
  panelDashboardTotalEmployeeLocationStore.onFetchItemsTotalEmployeeLocation();
  onSetDashboardIntervalRealtimeSecond();
});

onBeforeUnmount(() => {
  clearInterval(intervalFetchData.value);
});
</script>
