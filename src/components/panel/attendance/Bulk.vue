<template>
  <BaseModal
    v-model="panelAttendanceBulkStore.isModalOpenForm"
    title="Edit Attendance"
    :classes="{
      modal: 'w-11/12 md:w-10/12 lg:w-7/12 xl:w-1/2',
    }"
  >
    <div class="space-y-5 my-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseInput
          :model-value="
            getDateFormat(panelAttendanceBulkStore.inputForm.from_date, 'full')
          "
          :error="panelAttendanceBulkStore.errorForm.from_date"
          label="Attendance From Date"
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
            getDateFormat(panelAttendanceBulkStore.inputForm.to_date, 'full')
          "
          :error="panelAttendanceBulkStore.errorForm.to_date"
          label="Attendance To Date"
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
                'ATTENDANCE_STATUS',
                panelAttendanceBulkStore.inputForm.status,
              )?.text
            "
            :error="panelAttendanceBulkStore.errorForm.status"
            label="Status"
            label-required
            placeholder="Select status"
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
            v-model="panelAttendanceBulkStore.inputForm.status"
            :items="selectionStore.getItemsSelectable('ATTENDANCE_STATUS')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>

      <div
        v-if="panelAttendanceBulkStore.inputForm.status === 'PRESENT'"
        class="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelAttendanceBulkStore.inputForm.start_time"
              :error="panelAttendanceBulkStore.errorForm.start_time"
              label="Start Time"
              placeholder="Choose time"
              readonly
              clearable
              :classes="{
                inputPadding: 'pl-3 pr-10',
                clearablePadding: 'pr-8',
                inputCursor: 'cursor-pointer',
              }"
              @click="isOpen ? onClose() : onOpen()"
              @clear="panelAttendanceBulkStore.inputForm.start_time = null"
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
              v-model="panelAttendanceBulkStore.inputForm.start_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelAttendanceBulkStore.inputForm.end_time"
              :error="panelAttendanceBulkStore.errorForm.end_time"
              label="End Time"
              placeholder="Choose time"
              readonly
              clearable
              :classes="{
                inputPadding: 'pl-3 pr-10',
                clearablePadding: 'pr-8',
                inputCursor: 'cursor-pointer',
              }"
              @click="isOpen ? onClose() : onOpen()"
              @clear="panelAttendanceBulkStore.inputForm.end_time = null"
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
              v-model="panelAttendanceBulkStore.inputForm.end_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>
      </div>

      <BaseTextarea
        v-model="panelAttendanceBulkStore.inputForm.note"
        :error="panelAttendanceBulkStore.errorForm.note"
        label="Note"
        clearable
        placeholder="Type a note"
        :classes="{
          textareaPadding: 'pl-3 pr-10',
        }"
      ></BaseTextarea>
    </div>

    <BaseCardAction>
      <BaseButton
        color="primary"
        :loading="panelAttendanceBulkStore.loadingSubmitForm"
        @click="panelAttendanceBulkStore.onSubmitForm()"
      >
        <Icon name="ph:floppy-disk-back-duotone" class="text-lg"></Icon>
        <BaseText> Save </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const selectionStore = useSelectionStore();
const panelAttendanceBulkStore = usePanelAttendanceBulkStore();
</script>
