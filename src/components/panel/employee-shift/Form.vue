<template>
  <BaseModal
    v-model="panelEmployeeShiftFormStore.isModalOpenForm"
    :title="
      panelEmployeeShiftFormStore.isEditing()
        ? 'Edit Employee Shift'
        : 'Add Employee Shift'
    "
    :classes="{
      modal: 'w-11/12 md:w-10/12 lg:w-7/12 xl:w-1/2',
    }"
  >
    <div class="space-y-5 my-5">
      <BaseInput
        :model-value="
          getDateFormat(panelEmployeeShiftFormStore.inputForm.date, 'full')
        "
        :error="panelEmployeeShiftFormStore.errorForm.date"
        :loading="panelEmployeeShiftFormStore.loadingItemEmployeeShift"
        label="Shift Date"
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

      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'SHIFT',
                panelEmployeeShiftFormStore.inputForm.shift,
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
            @clear="panelEmployeeShiftFormStore.inputForm.shift = null"
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
            v-model="panelEmployeeShiftFormStore.inputForm.shift"
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
                        `${panelEmployeeShiftFormStore.inputForm.date} ${options.item?.start_time}`,
                        timezone,
                      )
                      .tz(timezone)
                      .format('HH:mm')
                  }}
                  -
                  {{
                    dayjs
                      .tz(
                        `${panelEmployeeShiftFormStore.inputForm.date} ${options.item?.end_time}`,
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
              :model-value="panelEmployeeShiftFormStore.inputForm.start_time"
              :error="panelEmployeeShiftFormStore.errorForm.start_time"
              :loading="panelEmployeeShiftFormStore.loadingItemEmployeeShift"
              :disabled="panelEmployeeShiftFormStore.isInputFormSelectShift"
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
              v-model="panelEmployeeShiftFormStore.inputForm.start_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelEmployeeShiftFormStore.inputForm.end_time"
              :error="panelEmployeeShiftFormStore.errorForm.end_time"
              :loading="panelEmployeeShiftFormStore.loadingItemEmployeeShift"
              :disabled="panelEmployeeShiftFormStore.isInputFormSelectShift"
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
              v-model="panelEmployeeShiftFormStore.inputForm.end_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>
      </div>
    </div>

    <BaseCardAction>
      <BaseButton
        v-if="panelEmployeeShiftFormStore.isEditing()"
        color="danger"
        variant="pastel"
        @click="
          panelEmployeeShiftListStore.onDeleteItemEmployeeShift(
            panelEmployeeShiftFormStore.employeeShiftId,
          )
        "
      >
        <Icon name="ph:trash-duotone" class="text-lg"></Icon>
        <BaseText> Delete </BaseText>
      </BaseButton>
      <BaseButton
        color="primary"
        :loading="panelEmployeeShiftFormStore.loadingSubmitForm"
        @click="panelEmployeeShiftFormStore.onSubmitForm()"
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
const panelEmployeeShiftFormStore = usePanelEmployeeShiftFormStore();
const panelEmployeeShiftListStore = usePanelEmployeeShiftListStore();

onMounted(() => {
  selectionStore.onFetchItemsSelectable('SHIFT');
});
</script>
