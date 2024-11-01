<template>
  <BaseModal
    v-model="panelOvertimeListStore.isModalOpenFilter"
    title="Filter"
    :classes="{
      modal: 'w-11/12 md:w-10/12 lg:w-7/12 xl:w-1/2',
    }"
  >
    <div class="space-y-5 my-5">
      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'DATE_FILTER_TYPE',
                panelOvertimeListStore.inputFilter.date_filter_type,
              )?.text
            "
            label="Date Filter Type"
            placeholder="Select date filter type"
            readonly
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
            v-model="panelOvertimeListStore.inputFilter.date_filter_type"
            :items="selectionStore.getItemsSelectable('DATE_FILTER_TYPE')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>

      <div
        v-if="panelOvertimeListStore.inputFilter.date_filter_type === 'CUSTOM'"
        class="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <BaseDropdown :classes="{ dropdown: 'min-w-80 h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                getDateFormat(
                  panelOvertimeListStore.inputFilter.start_date,
                  'full',
                )
              "
              label="Start Date"
              placeholder="Choose date"
              readonly
              clearable
              :classes="{
                inputPadding: 'pl-3 pr-10',
                inputCursor: 'cursor-pointer',
                clearablePadding: 'pr-8',
              }"
              @click="isOpen ? onClose() : onOpen()"
              @clear="panelOvertimeListStore.inputFilter.start_date = null"
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
              v-model="panelOvertimeListStore.inputFilter.start_date"
              @on-select="onClose()"
            ></BaseDatepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'min-w-80 h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                getDateFormat(
                  panelOvertimeListStore.inputFilter.end_date,
                  'full',
                )
              "
              label="End Date"
              placeholder="Choose date"
              readonly
              clearable
              :classes="{
                inputPadding: 'pl-3 pr-10',
                inputCursor: 'cursor-pointer',
                clearablePadding: 'pr-8',
              }"
              @click="isOpen ? onClose() : onOpen()"
              @clear="panelOvertimeListStore.inputFilter.end_date = null"
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
              v-model="panelOvertimeListStore.inputFilter.end_date"
              :start-date="panelOvertimeListStore.inputFilter.start_date"
              @on-select="onClose()"
            ></BaseDatepicker>
          </template>
        </BaseDropdown>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseDropdown
          :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }"
        >
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                selectionStore.getSelectable(
                  'DEPARTMENT',
                  panelOvertimeListStore.inputFilter.department,
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
              @clear="panelOvertimeListStore.inputFilter.department = null"
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
              v-model="panelOvertimeListStore.inputFilter.department"
              :items="selectionStore.getItemsSelectable('DEPARTMENT')"
              @on-select="onClose()"
            ></BaseListSelection>
          </template>
        </BaseDropdown>

        <BaseDropdown
          :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }"
        >
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                selectionStore.getSelectable(
                  'JOB_POSITION',
                  panelOvertimeListStore.inputFilter.job_position,
                )?.text
              "
              label="Job Position"
              placeholder="Select job position"
              readonly
              clearable
              :classes="{
                inputPadding: 'pl-3 pr-10',
                inputCursor: 'cursor-pointer',
                clearablePadding: 'pr-8',
              }"
              @click="isOpen ? onClose() : onOpen()"
              @clear="panelOvertimeListStore.inputFilter.job_position = null"
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
              v-model="panelOvertimeListStore.inputFilter.job_position"
              :items="selectionStore.getItemsSelectable('JOB_POSITION')"
              @on-select="onClose()"
            ></BaseListSelection>
          </template>
        </BaseDropdown>
      </div>
    </div>

    <BaseCardAction>
      <BaseButton @click="panelOvertimeListStore.onResetFilter()">
        <Icon name="ph:x" class="text-lg"></Icon>
        <BaseText> Clear </BaseText>
      </BaseButton>
      <BaseButton
        color="primary"
        @click="panelOvertimeListStore.onApplyFilter()"
      >
        <Icon name="ph:check-circle-duotone" class="text-lg"></Icon>
        <BaseText> Apply </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const selectionStore = useSelectionStore();
const panelOvertimeListStore = usePanelOvertimeListStore();
</script>
