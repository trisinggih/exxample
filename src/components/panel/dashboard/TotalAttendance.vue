<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Total Attendance">
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
                  panelDashboardTotalAttendanceStore.inputFilter.date,
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
              v-model="panelDashboardTotalAttendanceStore.inputFilter.date"
              @on-select="onClose()"
            ></BaseDatepicker>
          </template>
        </BaseDropdown>

        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="
              panelDashboardTotalAttendanceStore.onFetchItemTotalAttendance()
            "
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="inline-flex items-center gap-4 rounded-xl">
        <BaseIconBox color="primary" size="lg" rounded="lg">
          <Icon name="ph:users-duotone" class="text-2xl"></Icon>
        </BaseIconBox>
        <div>
          <div
            v-if="panelDashboardTotalAttendanceStore.loadingItemTotalAttendance"
            class="h-7 mb-0.5 rounded-md bg-slate-200 animate-pulse"
          ></div>
          <BaseText v-else size="xl" weight="bold">
            {{
              panelDashboardTotalAttendanceStore.itemTotalAttendance
                .count_employee
            }}
          </BaseText>
          <BaseText size="sm" weight="light"> Employee </BaseText>
        </div>
      </div>
      <div class="inline-flex items-center gap-4 rounded-xl">
        <BaseIconBox color="success" size="lg" rounded="lg">
          <Icon name="ph:clock-duotone" class="text-3xl"></Icon>
        </BaseIconBox>
        <div>
          <div
            v-if="panelDashboardTotalAttendanceStore.loadingItemTotalAttendance"
            class="h-7 mb-0.5 rounded-md bg-slate-200 animate-pulse"
          ></div>
          <BaseText v-else size="xl" weight="bold">
            {{
              panelDashboardTotalAttendanceStore.itemTotalAttendance
                .count_present
            }}
          </BaseText>
          <BaseText size="sm" weight="light"> Present </BaseText>
        </div>
      </div>
      <div class="inline-flex items-center gap-4 rounded-xl">
        <BaseIconBox color="danger" size="lg" rounded="lg">
          <Icon name="ph:x-circle-duotone" class="text-3xl"></Icon>
        </BaseIconBox>
        <div>
          <div
            v-if="panelDashboardTotalAttendanceStore.loadingItemTotalAttendance"
            class="h-7 mb-0.5 rounded-md bg-slate-200 animate-pulse"
          ></div>
          <BaseText v-else size="xl" weight="bold">
            {{
              panelDashboardTotalAttendanceStore.itemTotalAttendance
                .count_absent
            }}
          </BaseText>
          <BaseText size="sm" weight="light"> Absent </BaseText>
        </div>
      </div>
      <div class="inline-flex items-center gap-4 rounded-xl">
        <BaseIconBox color="warning" size="lg" rounded="lg">
          <Icon name="ph:clock-afternoon-duotone" class="text-3xl"></Icon>
        </BaseIconBox>
        <div>
          <div
            v-if="panelDashboardTotalAttendanceStore.loadingItemTotalAttendance"
            class="h-7 mb-0.5 rounded-md bg-slate-200 animate-pulse"
          ></div>
          <BaseText v-else size="xl" weight="bold">
            {{
              panelDashboardTotalAttendanceStore.itemTotalAttendance
                .count_overtime
            }}
          </BaseText>
          <BaseText size="sm" weight="light"> Overtime </BaseText>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script lang="ts" setup>
const panelDashboardTotalAttendanceStore =
  usePanelDashboardTotalAttendanceStore();

onMounted(() => {
  panelDashboardTotalAttendanceStore.onFetchItemTotalAttendance();
});
</script>
