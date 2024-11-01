<template>
  <BaseModal v-model="panelEmployeeListStore.isModalOpenFilter" title="Filter">
    <div class="space-y-5 my-5">
      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'DEPARTMENT',
                panelEmployeeListStore.inputFilter.department,
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
            @clear="panelEmployeeListStore.inputFilter.department = null"
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
            v-model="panelEmployeeListStore.inputFilter.department"
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
                panelEmployeeListStore.inputFilter.job_position,
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
            @clear="panelEmployeeListStore.inputFilter.job_position = null"
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
            v-model="panelEmployeeListStore.inputFilter.job_position"
            :items="selectionStore.getItemsSelectable('JOB_POSITION')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>

      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'ACTIVATION_STATUS',
                panelEmployeeListStore.inputFilter.status,
              )?.text
            "
            label="Status"
            placeholder="Select status"
            readonly
            clearable
            :classes="{
              inputPadding: 'pl-3 pr-10',
              inputCursor: 'cursor-pointer',
              clearablePadding: 'pr-8',
            }"
            @click="isOpen ? onClose() : onOpen()"
            @clear="panelEmployeeListStore.inputFilter.status = null"
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
            v-model="panelEmployeeListStore.inputFilter.status"
            :items="selectionStore.getItemsSelectable('ACTIVATION_STATUS')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>
    </div>

    <BaseCardAction>
      <BaseButton @click="panelEmployeeListStore.onResetFilter()">
        <Icon name="ph:x" class="text-lg"></Icon>
        <BaseText> Clear </BaseText>
      </BaseButton>
      <BaseButton
        color="primary"
        @click="panelEmployeeListStore.onApplyFilter()"
      >
        <Icon name="ph:check-circle-duotone" class="text-lg"></Icon>
        <BaseText> Apply </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const selectionStore = useSelectionStore();
const panelEmployeeListStore = usePanelEmployeeListStore();
</script>
