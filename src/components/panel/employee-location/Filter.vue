<template>
  <BaseModal
    v-model="panelEmployeeLocationListStore.isModalOpenFilter"
    title="Filter"
  >
    <div class="space-y-5 my-5">
      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'DEPARTMENT',
                panelEmployeeLocationListStore.inputFilter.department,
              )?.text
            "
            label="Department"
            placeholder="Select department"
            readonly
            clearable
            :classes="{
              inputPadding: 'pl-3 pr-10',
              inputCursor: 'cursor-pointer',
              clearablePadding: 'pr-8',
            }"
            @click="isOpen ? onClose() : onOpen()"
            @clear="
              panelEmployeeLocationListStore.inputFilter.department = null
            "
          >
            <template #suffix>
              <div
                class="input-suffix-icon cursor-pointer"
                @click="isOpen ? onClose() : onOpen()"
              >
                <Icon
                  name="ph:caret-down-bold"
                  class="duration-300"
                  :class="{
                    'rotate-180': isOpen,
                  }"
                ></Icon>
              </div>
            </template>
          </BaseInput>
        </template>
        <template #default="{ onClose }">
          <BaseListSelection
            v-model="panelEmployeeLocationListStore.inputFilter.department"
            :items="selectionStore.getItemsSelectable('DEPARTMENT')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>

      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'JOB_POSITION',
                panelEmployeeLocationListStore.inputFilter.job_position,
              )?.text
            "
            label="Job Positon"
            placeholder="Select job position"
            readonly
            clearable
            :classes="{
              inputPadding: 'pl-3 pr-10',
              inputCursor: 'cursor-pointer',
              clearablePadding: 'pr-8',
            }"
            @click="isOpen ? onClose() : onOpen()"
            @clear="
              panelEmployeeLocationListStore.inputFilter.job_position = null
            "
          >
            <template #suffix>
              <div
                class="input-suffix-icon cursor-pointer"
                @click="isOpen ? onClose() : onOpen()"
              >
                <Icon
                  name="ph:caret-down-bold"
                  class="duration-300"
                  :class="{
                    'rotate-180': isOpen,
                  }"
                ></Icon>
              </div>
            </template>
          </BaseInput>
        </template>
        <template #default="{ onClose }">
          <BaseListSelection
            v-model="panelEmployeeLocationListStore.inputFilter.job_position"
            :items="selectionStore.getItemsSelectable('JOB_POSITION')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>
    </div>

    <BaseCardAction>
      <BaseButton @click="panelEmployeeLocationListStore.onResetFilter()">
        <Icon name="ph:x" class="text-lg"></Icon>
        <BaseText> Clear </BaseText>
      </BaseButton>
      <BaseButton
        color="primary"
        @click="panelEmployeeLocationListStore.onApplyFilter()"
      >
        <Icon name="ph:check-circle-duotone" class="text-lg"></Icon>
        <BaseText> Apply </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const selectionStore = useSelectionStore();
const panelEmployeeLocationListStore = usePanelEmployeeLocationListStore();
</script>
