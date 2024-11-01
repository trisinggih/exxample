<template>
  <BaseCard rounded="lg" class="px-5 pb-5 space-y-5">
    <BaseCardHead title="Location List">
      <template #action>
        <NuxtLink to="/panel/employee/add" class="ml-auto">
          <BaseButton color="primary">
            <div class="flex items-center gap-2">
              <Icon name="ph:plus-bold" class="text-lg"></Icon>
              <BaseText> Add </BaseText>
            </div>
          </BaseButton>
        </NuxtLink>
      </template>
    </BaseCardHead>

    <div class="flex flex-col lg:flex-row gap-5">
      <BaseInput
        v-model="search"
        placeholder="Search"
        clearable
        :classes="{
          inputPadding: 'pl-10 pr-10',
        }"
      >
        <template #prefix>
          <div
            class="h-full aspect-square grid place-content-center text-slate-400"
          >
            <Icon name="ph:magnifying-glass-duotone" class="text-xl"></Icon>
          </div>
        </template>
      </BaseInput>
    </div>

    <BaseTable :column-length="4">
      <template #heading>
        <BaseTableHeading align="center" min-width="70px" width="70px">
          #
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Name
        </BaseTableHeading>
        <BaseTableHeading align="left" min-width="200px">
          Address
        </BaseTableHeading>
        <BaseTableHeading align="center" min-width="150px" width="150px">
          Action
        </BaseTableHeading>
      </template>

      <template #body>
        <BaseTableRow v-for="i in 10" :key="i">
          <BaseTableCell align="center">
            {{ i }}
          </BaseTableCell>
          <BaseTableCell align="left"> Factory A </BaseTableCell>
          <BaseTableCell align="left"> Jalan Soka No. 14 </BaseTableCell>
          <BaseTableCell align="center">
            <div class="inline-flex items-center gap-2">
              <BaseTooltip text="Edit">
                <NuxtLink :to="`/panel/user/${i}/edit`">
                  <BaseButtonIcon color="primary" rounded="full">
                    <Icon name="ph:pencil-duotone" class="text-lg"></Icon>
                  </BaseButtonIcon>
                </NuxtLink>
              </BaseTooltip>

              <BaseTooltip text="Delete">
                <BaseButtonIcon color="danger" rounded="full">
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
const search = ref();
</script>
