<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Employee List">
      <template #action>
        <BaseTooltip text="Refresh">
          <BaseButtonIcon
            rounded="full"
            @click="panelEmployeeListStore.onFetchItemsEmployee()"
          >
            <Icon name="ph:arrow-clockwise-bold"></Icon>
          </BaseButtonIcon>
        </BaseTooltip>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-3">
      <BaseInput
        v-model="panelEmployeeListStore.inputSearch.search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
        @clear="panelEmployeeListStore.inputSearch.search = null"
      >
        <template #prefix>
          <div class="input-prefix-icon">
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>

      <div class="grow flex flex-col md:flex-row gap-3">
        <BaseBadge
          :show="isActiveFilter(panelEmployeeListStore.inputFilter)"
          class="md:mr-auto"
        >
          <BaseButton
            block
            @click="panelEmployeeListStore.isModalOpenFilter = true"
          >
            <Icon name="ph:funnel" class="text-lg"></Icon>
            <BaseText> Filter </BaseText>
          </BaseButton>
        </BaseBadge>

        <BaseButton
          v-if="isUserRoles(['ADMIN', 'HR'])"
          color="primary"
          variant="pastel"
          class="w-full md:w-auto"
          @click="panelEmployeeImportStore.onOpenModal()"
        >
          <Icon name="ph:tray-arrow-down-duotone" class="text-lg"></Icon>
          <BaseText> Import </BaseText>
        </BaseButton>

        <NuxtLink v-if="isUserRoles(['ADMIN', 'HR'])" to="/panel/employee/add">
          <BaseButton color="primary" class="w-full md:w-auto">
            <Icon name="ph:plus-bold" class="text-lg"></Icon>
            <BaseText> Add </BaseText>
          </BaseButton>
        </NuxtLink>
      </div>
    </div>

    <BaseTable
      :loading="panelEmployeeListStore.loadingItemsEmployee"
      :is-empty="panelEmployeeListStore.itemsEmployee.length === 0"
      :column-length="isUserRoles(['ADMIN', 'HR']) ? 8 : 7"
    >
      <template #heading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="100px">
          Picture
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Name
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          ID Employee
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Department
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Job Position
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="100px">
          Status
        </BaseTableHeading>
        <BaseTableHeading
          v-if="isUserRoles(['ADMIN', 'HR'])"
          align="center"
          min-width="150px"
          width="150px"
          sticky-right
        >
          Action
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow
          v-for="(obj, i) in panelEmployeeListStore.itemsEmployee"
          :key="i"
        >
          <BaseTableCell align="center">
            {{ panelEmployeeListStore.getRowNumber(i) }}
          </BaseTableCell>
          <BaseTableCell align="center">
            <div class="flex items-center gap-3">
              <BaseAvatar
                :src="obj.picture || getAvatarDefault(obj.gender)"
              ></BaseAvatar>
            </div>
          </BaseTableCell>
          <BaseTableCell align="left">
            {{ obj.full_name }}
          </BaseTableCell>
          <BaseTableCell align="left">
            {{ obj.employee_identity_number }}
          </BaseTableCell>
          <BaseTableCell align="left">
            {{ obj.department_text }}
          </BaseTableCell>
          <BaseTableCell align="left">
            {{ obj.job_position_text }}
          </BaseTableCell>
          <BaseTableCell align="center">
            <BaseChip :color="obj.is_active ? 'success' : 'danger'" size="sm">
              {{ obj.is_active ? 'Active' : 'Inactive' }}
            </BaseChip>
          </BaseTableCell>
          <BaseTableCell
            v-if="isUserRoles(['ADMIN', 'HR'])"
            align="center"
            sticky-right
          >
            <div class="inline-flex items-center gap-2">
              <BaseTooltip text="Identity Card">
                <BaseButtonIcon
                  rounded="full"
                  :loading="obj.loadingPrintIdentityCard"
                  @click="
                    panelEmployeeListStore.onPrintIdentityCardItemEmployee(obj)
                  "
                >
                  <Icon
                    name="ph:identification-card-duotone"
                    class="text-lg"
                  ></Icon>
                </BaseButtonIcon>
              </BaseTooltip>

              <BaseTooltip text="Edit">
                <NuxtLink :to="`/panel/employee/${obj._id}/edit`">
                  <BaseButtonIcon color="primary" rounded="full">
                    <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
                  </BaseButtonIcon>
                </NuxtLink>
              </BaseTooltip>

              <BaseTooltip text="Delete">
                <BaseButtonIcon
                  color="danger"
                  rounded="full"
                  @click="panelEmployeeListStore.onDeleteItemEmployee(obj)"
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
      v-model:page="panelEmployeeListStore.inputPagination.page"
      v-model:per-page="panelEmployeeListStore.inputPagination.per_page"
      :total-data="panelEmployeeListStore.totalEmployee"
    ></BasePagination>
  </BaseCard>
</template>

<script lang="ts" setup>
const panelEmployeeListStore = usePanelEmployeeListStore();
const panelEmployeeImportStore = usePanelEmployeeImportStore();

onMounted(() => {
  panelEmployeeListStore.onFetchItemsEmployee();
});
</script>
