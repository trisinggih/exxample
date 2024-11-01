<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="User List">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="panelUserListStore.onFetchItemsUser()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelUserListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelUserListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <BaseBadge :show="isActiveFilter(panelUserListStore.inputFilter)">
          <BaseButton
            class="w-full md:w-auto"
            @click="panelUserListStore.isModalOpenFilter = true"
          >
            <Icon name="ph:funnel" class="text-lg"></Icon>
            <BaseText> Filter </BaseText>
          </BaseButton>
        </BaseBadge>

        <NuxtLink to="/panel/user/add" class="md:ml-auto">
          <BaseButton color="primary" class="w-full md:w-auto">
            <Icon name="ph:plus-bold" class="text-lg"></Icon>
            <BaseText> Add </BaseText>
          </BaseButton>
        </NuxtLink>
      </div>
    </div>

    <BaseTable
      :loading="panelUserListStore.loadingItemsUser"
      :is-empty="panelUserListStore.itemsUser.length === 0"
      :column-length="6"
    >
      <template #heading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Name
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Email
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="100px">
          Role
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="100px">
          Status
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="150px" width="150px">
          Action
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow v-for="(obj, i) in panelUserListStore.itemsUser" :key="i">
          <BaseTableCell align="center">
            {{ panelUserListStore.getRowNumber(i) }}
          </BaseTableCell>
          <BaseTableCell align="left">
            {{ obj.name }}
          </BaseTableCell>
          <BaseTableCell align="left">
            {{ obj.email }}
          </BaseTableCell>
          <BaseTableCell align="center">
            {{ obj.role_text }}
          </BaseTableCell>
          <BaseTableCell align="center">
            <BaseChip :color="obj.is_active ? 'success' : 'danger'" size="sm">
              {{ obj.is_active ? 'Active' : 'Inactive' }}
            </BaseChip>
          </BaseTableCell>
          <BaseTableCell align="center">
            <div class="inline-flex items-center gap-2">
              <BaseTooltip text="Edit">
                <NuxtLink :to="`/panel/user/${obj._id}/edit`">
                  <BaseButtonIcon color="primary" rounded="full">
                    <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
                  </BaseButtonIcon>
                </NuxtLink>
              </BaseTooltip>

              <BaseTooltip text="Delete">
                <BaseButtonIcon
                  color="danger"
                  rounded="full"
                  @click="panelUserListStore.onDeleteItemUser(obj)"
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
      v-model:page="panelUserListStore.inputPagination.page"
      v-model:per-page="panelUserListStore.inputPagination.per_page"
      :total-data="panelUserListStore.totalUser"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const panelUserListStore = usePanelUserListStore();

onMounted(() => {
  panelUserListStore.onFetchItemsUser();
});
</script>
