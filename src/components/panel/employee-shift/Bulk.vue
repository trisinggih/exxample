<template>
  <BaseModal
    v-model="panelEmployeeShiftBulkStore.isModalOpenForm"
    title="Edit Employee Shift"
    :classes="{
      modal: 'w-11/12 md:w-10/12 lg:w-7/12 xl:w-1/2',
    }"
  >
    <div class="space-y-5 my-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseInput
          :model-value="
            getDateFormat(
              panelEmployeeShiftBulkStore.inputForm.from_date,
              'full',
            )
          "
          :error="panelEmployeeShiftBulkStore.errorForm.from_date"
          label="Shift From Date"
          label-required
          disabled
          :classes="{
            inputPadding: 'pl-3 pr-16',
          }"
        >
          <template #suffix>
            <div class="input-suffix-icon">
              <Icon name="ph:calendar-blank-duotone"></Icon>
            </div>
          </template>
        </BaseInput>

        <BaseInput
          :model-value="
            getDateFormat(panelEmployeeShiftBulkStore.inputForm.to_date, 'full')
          "
          :error="panelEmployeeShiftBulkStore.errorForm.to_date"
          label="Shift To Date"
          label-required
          disabled
          :classes="{
            inputPadding: 'pl-3 pr-16',
          }"
        >
          <template #suffix>
            <div class="input-suffix-icon">
              <Icon name="ph:calendar-blank-duotone"></Icon>
            </div>
          </template>
        </BaseInput>
      </div>

      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'SHIFT',
                panelEmployeeShiftBulkStore.inputForm.shift,
              )?.text
            "
            label="Shift"
            placeholder="Select shift"
            readonly
            clearable
            :classes="{
              inputPadding: 'pl-3 pr-10',
              inputCursor: 'cursor-pointer',
              clearablePadding: 'pr-8',
            }"
            @click="isOpen ? onClose() : onOpen()"
            @clear="panelEmployeeShiftBulkStore.inputForm.shift = null"
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
            v-model="panelEmployeeShiftBulkStore.inputForm.shift"
            :items="selectionStore.getItemsSelectable('SHIFT')"
            @on-select="onClose()"
          >
            <template #item="options">
              <div
                :class="options.listItemClass(options.item)"
                @click="options.onSelectItem(options.item)"
              >
                <span class="mr-auto">
                  {{ options.item?.text }}
                </span>
                <span>
                  {{
                    dayjs
                      .tz(
                        `${panelEmployeeShiftBulkStore.inputForm.from_date} ${options.item?.start_time}`,
                        timezone,
                      )
                      .tz(timezone)
                      .format('HH:mm')
                  }}
                  -
                  {{
                    dayjs
                      .tz(
                        `${panelEmployeeShiftBulkStore.inputForm.from_date} ${options.item?.end_time}`,
                        timezone,
                      )
                      .tz(timezone)
                      .format('HH:mm')
                  }}
                </span>
              </div>
            </template>
          </BaseListSelection>
        </template>
      </BaseDropdown>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelEmployeeShiftBulkStore.inputForm.start_time"
              :error="panelEmployeeShiftBulkStore.errorForm.start_time"
              :disabled="panelEmployeeShiftBulkStore.isInputFormSelectShift"
              label="Start Time"
              label-required
              placeholder="Choose time"
              readonly
              :classes="{
                inputPadding: 'pl-3 pr-10',
                clearablePadding: 'pr-8',
                inputCursor: 'cursor-pointer',
              }"
              @click="isOpen ? onClose() : onOpen()"
            >
              <template #suffix>
                <div
                  class="input-suffix-icon cursor-pointer"
                  @click="isOpen ? onClose() : onOpen()"
                >
                  <Icon name="ph:clock-duotone"></Icon>
                </div>
              </template>
            </BaseInput>
          </template>
          <template #default="{ onClose }">
            <BaseTimepicker
              v-model="panelEmployeeShiftBulkStore.inputForm.start_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelEmployeeShiftBulkStore.inputForm.end_time"
              :error="panelEmployeeShiftBulkStore.errorForm.end_time"
              :disabled="panelEmployeeShiftBulkStore.isInputFormSelectShift"
              label="End Time"
              label-required
              placeholder="Choose time"
              readonly
              :classes="{
                inputPadding: 'pl-3 pr-10',
                clearablePadding: 'pr-8',
                inputCursor: 'cursor-pointer',
              }"
              @click="isOpen ? onClose() : onOpen()"
            >
              <template #suffix>
                <div
                  class="input-suffix-icon cursor-pointer"
                  @click="isOpen ? onClose() : onOpen()"
                >
                  <Icon name="ph:clock-duotone"></Icon>
                </div>
              </template>
            </BaseInput>
          </template>
          <template #default="{ onClose }">
            <BaseTimepicker
              v-model="panelEmployeeShiftBulkStore.inputForm.end_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>
      </div>
    </div>

    <BaseCardAction>
      <BaseButton
        color="primary"
        :loading="panelEmployeeShiftBulkStore.loadingSubmitForm"
        @click="panelEmployeeShiftBulkStore.onSubmitForm()"
      >
        <Icon name="ph:floppy-disk-back-duotone" class="text-lg"></Icon>
        <BaseText> Save </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const { dayjs, timezone } = useNuxtApp();

const selectionStore = useSelectionStore();
const panelEmployeeShiftBulkStore = usePanelEmployeeShiftBulkStore();
</script>
