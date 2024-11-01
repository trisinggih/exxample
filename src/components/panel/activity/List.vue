<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Activity Log">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="panelActivityListStore.onFetchItemsActivity()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelActivityListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelActivityListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <BaseBadge
          :show="isActiveFilter(panelActivityListStore.inputFilter)"
          class="md:mr-auto"
        >
          <BaseButton
            class="w-full md:w-auto"
            @click="panelActivityListStore.isModalOpenFilter = true"
          >
            <Icon name="ph:funnel" class="text-lg"></Icon>
            <BaseText> Filter </BaseText>
          </BaseButton>
        </BaseBadge>

        <BaseButton
          v-if="isUserRoles(['ADMIN', 'OWNER', 'HR', 'SUPERVISOR'])"
          color="primary"
          variant="outline"
          class="w-full md:w-auto"
          :loading="panelActivityListStore.loadingDownloadLog"
          @click="panelActivityListStore.onDownloadLog()"
        >
          <Icon name="ph:download-simple" class="text-lg"></Icon>
          <BaseText> Download Log </BaseText>
        </BaseButton>
      </div>
    </div>

    <BaseTable
      :loading="panelActivityListStore.loadingItemsActivity"
      :is-empty="panelActivityListStore.itemsActivity.length === 0"
      :column-length="6"
    >
      <template #heading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Employee
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Location
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Date
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="150px">
          Time
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="150px">
          Activity Type
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow
          v-for="(obj, i) in panelActivityListStore.itemsActivity"
          :key="i"
        >
          <BaseTableCell align="center">
            {{ panelActivityListStore.getRowNumber(i) }}
          </BaseTableCell>
          <BaseTableCell align="left">
            <div class="flex items-center gap-3">
              <BaseAvatar
                :src="
                  obj.employee?.picture ||
                  getAvatarDefault(obj?.employee?.gender)
                "
                size="sm"
              ></BaseAvatar>
              <div class="grow">
                <BaseText class="line-clamp-1">
                  {{ obj.employee?.full_name }}
                </BaseText>
                <BaseText size="xs" class="line-clamp-1">
                  {{ obj.employee?.employee_identity_number }}
                </BaseText>
                <div class="flex items-center flex-wrap">
                  <BaseText size="xs" weight="light" class="text-dark-400">
                    {{ obj.employee?.department_text }}
                  </BaseText>
                  <Icon name="ph:dot" class="text-dark-400 text-lg"></Icon>
                  <BaseText size="xs" weight="light" class="text-dark-400">
                    {{ obj.employee?.job_position_text }}
                  </BaseText>
                </div>
              </div>
            </div>
          </BaseTableCell>
          <BaseTableCell align="left"> {{ obj.location?.name }} </BaseTableCell>
          <BaseTableCell align="left">
            {{ getDateFormat(obj.datetime, 'full') }}
          </BaseTableCell>
          <BaseTableCell align="left">
            {{
              obj.datetime
                ? dayjs.tz(obj.datetime).tz(obj.timezone).format('HH:mm:ss')
                : '--:--:--'
            }}
          </BaseTableCell>
          <BaseTableCell align="center">
            <BaseChip size="sm" :color="obj.activity_type_color">
              {{ obj.activity_type_text }}
            </BaseChip>
          </BaseTableCell>
        </BaseTableRow>
      </template>
    </BaseTable>

    <BasePagination
      v-model:page="panelActivityListStore.inputPagination.page"
      v-model:per-page="panelActivityListStore.inputPagination.per_page"
      :total-data="panelActivityListStore.totalActivity"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const { dayjs } = useNuxtApp();

const panelActivityListStore = usePanelActivityListStore();

onMounted(() => {
  panelActivityListStore.onFetchItemsActivity();
});
</script>
