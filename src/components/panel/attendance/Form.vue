<template>
  <BaseModal
    v-model="panelAttendanceFormStore.isModalOpenForm"
    :title="
      panelAttendanceFormStore.isEditing()
        ? 'Edit Attendance'
        : 'Add Attendance'
    "
    :classes="{
      modal: 'w-11/12 md:w-10/12 lg:w-7/12 xl:w-1/2',
    }"
  >
    <div class="space-y-5 my-5">
      <BaseInput
        :model-value="
          getDateFormat(panelAttendanceFormStore.inputForm.date, 'full')
        "
        :error="panelAttendanceFormStore.errorForm.date"
        :loading="panelAttendanceFormStore.loadingItemAttendance"
        label="Attendance Date"
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
                'ATTENDANCE_STATUS',
                panelAttendanceFormStore.inputForm.status,
              )?.text
            "
            :error="panelAttendanceFormStore.errorForm.status"
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
            v-model="panelAttendanceFormStore.inputForm.status"
            :items="selectionStore.getItemsSelectable('ATTENDANCE_STATUS')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>

      <div
        v-if="panelAttendanceFormStore.inputForm.status === 'PRESENT'"
        class="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelAttendanceFormStore.inputForm.start_time"
              :error="panelAttendanceFormStore.errorForm.start_time"
              :loading="panelAttendanceFormStore.loadingItemAttendance"
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
              @clear="panelAttendanceFormStore.inputForm.start_time = null"
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
              v-model="panelAttendanceFormStore.inputForm.start_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelAttendanceFormStore.inputForm.end_time"
              :error="panelAttendanceFormStore.errorForm.end_time"
              :loading="panelAttendanceFormStore.loadingItemAttendance"
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
              @clear="panelAttendanceFormStore.inputForm.end_time = null"
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
              v-model="panelAttendanceFormStore.inputForm.end_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>
      </div>

      <BaseTextarea
        v-model="panelAttendanceFormStore.inputForm.note"
        :error="panelAttendanceFormStore.errorForm.note"
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
        v-if="panelAttendanceFormStore.isEditing()"
        color="danger"
        variant="pastel"
        @click="
          panelAttendanceListStore.onDeleteItemAttendance(
            panelAttendanceFormStore.attendanceId,
          )
        "
      >
        <Icon name="ph:trash-duotone" class="text-lg"></Icon>
        <BaseText> Delete </BaseText>
      </BaseButton>
      <BaseButton
        color="primary"
        :loading="panelAttendanceFormStore.loadingSubmitForm"
        @click="panelAttendanceFormStore.onSubmitForm()"
      >
        <Icon name="ph:floppy-disk-back-duotone" class="text-lg"></Icon>
        <BaseText> Save </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const selectionStore = useSelectionStore();
const panelAttendanceFormStore = usePanelAttendanceFormStore();
const panelAttendanceListStore = usePanelAttendanceListStore();
</script>
