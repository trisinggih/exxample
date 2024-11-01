<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Setting List">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="panelSettingListStore.onFetchItemsSetting()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelSettingListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelSettingListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <NuxtLink to="/panel/setting/add" class="md:ml-auto">
          <BaseButton color="primary" class="w-full md:w-auto">
            <Icon name="ph:plus-bold" class="text-lg"></Icon>
            <BaseText> Add </BaseText>
          </BaseButton>
        </NuxtLink>
      </div>
    </div>

    <BaseTable
      :loading="panelSettingListStore.loadingItemsSetting"
      :is-empty="panelSettingListStore.itemsSetting.length === 0"
      :column-length="4"
    >
      <template #heading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Key
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Value
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="150px" width="150px">
          Action
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow
          v-for="(obj, i) in panelSettingListStore.itemsSetting"
          :key="i"
        >
          <BaseTableCell align="center">
            {{ i + 1 }}
          </BaseTableCell>
          <BaseTableCell align="left"> {{ obj.key }} </BaseTableCell>
          <BaseTableCell align="left"> {{ obj.value }} </BaseTableCell>
          <BaseTableCell align="center">
            <div class="inline-flex items-center gap-2">
              <BaseTooltip text="Edit">
                <NuxtLink :to="`/panel/setting/${obj._id}/edit`">
                  <BaseButtonIcon color="primary" rounded="full">
                    <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
                  </BaseButtonIcon>
                </NuxtLink>
              </BaseTooltip>

              <BaseTooltip text="Delete">
                <BaseButtonIcon
                  color="danger"
                  rounded="full"
                  @click="panelSettingListStore.onDeleteItemSetting(obj)"
                >
                  <Icon name="ph:trash-duotone" class="text-lg"></Icon>
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
const panelSettingListStore = usePanelSettingListStore();

onMounted(() => {
  panelSettingListStore.onFetchItemsSetting();
});
</script>
