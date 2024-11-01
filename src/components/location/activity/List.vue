<template>
  <BaseCard rounded="lg" class="px-4 pb-4 space-y-5">
    <BaseCardHead
      :title="`Activites ${locationActivityListStore.itemLocation?.name || ''}`"
    >
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="locationActivityListStore.onFetchItemsActivity()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip> </template
    ></BaseCardHead>

    <div class="flex flex-col-reverse md:flex-row gap-5">
      <div class="grow grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="inline-flex items-center gap-4 rounded-xl">
          <BaseIconBox color="primary" size="lg" rounded="lg">
            <Icon name="ph:users-duotone" class="text-2xl"></Icon>
          </BaseIconBox>
          <div>
            <BaseText size="xl" weight="bold" leading="tight">
              {{ locationActivityListStore.totalEmployee }}
            </BaseText>
            <BaseText size="sm" weight="light" leading="tight">
              Employee
            </BaseText>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:items-end min-w-44">
        <BaseText v-if="nowDatetime" size="sm" class="text-slate-400">
          {{ dayjs.tz(nowDatetime).format('DD MMMM YYYY') }}
        </BaseText>
        <BaseText
          v-if="nowDatetime"
          size="3xl"
          weight="semibold"
          class="text-dark"
        >
          {{ dayjs.tz(nowDatetime).format('HH:mm:ss') }}
        </BaseText>
      </div>
    </div>

    <BaseTable
      :loading="locationActivityListStore.loadingItemsActivity"
      :is-empty="locationActivityListStore.itemsActivity.length === 0"
      :column-length="3"
    >
      <template #heading>
        <BaseTableHeading align="left" min-width="200px">
          Employee
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="100px" width="100px">
          Time
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="100px" width="100px">
          Type
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow
          v-for="(obj, i) in locationActivityListStore.itemsActivity"
          :key="i"
        >
          <BaseTableCell align="left">
            <div class="flex items-center gap-3">
              <BaseAvatar
                :src="
                  obj.employee?.picture ||
                  getAvatarDefault(obj.employee?.gender)
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
          <BaseTableCell align="center">
            {{
              obj.datetime
                ? dayjs.tz(obj.datetime).tz(obj.timezone).format('HH:mm')
                : '--:--'
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
      v-model:page="locationActivityListStore.inputPagination.page"
      v-model:per-page="locationActivityListStore.inputPagination.per_page"
      :total-data="locationActivityListStore.totalActivity"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const { dayjs, timezone } = useNuxtApp();

const locationActivityListStore = useLocationActivityListStore();

const nowDatetime = ref(null as any);
const intervalNowDatetime = ref();
const onIntervalNowDatetime = () => {
  intervalNowDatetime.value = setInterval(() => {
    if (!nowDatetime.value) {
      nowDatetime.value = dayjs.tz().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    } else {
      nowDatetime.value = dayjs
        .tz(nowDatetime.value, timezone)
        .tz(timezone)
        .add(1, 'seconds')
        .format('YYYY-MM-DD HH:mm:ss');
    }
  }, 1000);
};

onUnmounted(() => {
  clearInterval(intervalNowDatetime.value);
});

onMounted(() => {
  onIntervalNowDatetime();
  locationActivityListStore.onFetchItemLocation();
  locationActivityListStore.onFetchItemsActivity();
});
</script>
