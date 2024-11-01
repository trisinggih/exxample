<template>
  <BaseModal
    v-model="panelOvertimeFormStore.isModalOpenForm"
    :title="
      panelOvertimeFormStore.isEditing() ? 'Edit Overtime' : 'Add Overtime'
    "
    :classes="{
      modal: 'w-11/12 md:w-10/12 lg:w-7/12 xl:w-1/2',
    }"
  >
    <div class="space-y-5 my-5">
      <BaseInput
        :model-value="
          getDateFormat(panelOvertimeFormStore.inputForm.date, 'full')
        "
        :error="panelOvertimeFormStore.errorForm.date"
        :loading="panelOvertimeFormStore.loadingItemOvertime"
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelOvertimeFormStore.inputForm.start_time"
              :error="panelOvertimeFormStore.errorForm.start_time"
              :loading="panelOvertimeFormStore.loadingItemOvertime"
              label="Start Time"
              label-required
              placeholder="Choose time"
              readonly
              clearable
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
              v-model="panelOvertimeFormStore.inputForm.start_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelOvertimeFormStore.inputForm.end_time"
              :error="panelOvertimeFormStore.errorForm.end_time"
              :loading="panelOvertimeFormStore.loadingItemOvertime"
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
              @clear="panelOvertimeFormStore.inputForm.end_time = null"
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
              v-model="panelOvertimeFormStore.inputForm.end_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>
      </div>
    </div>

    <BaseCardAction>
      <BaseButton
        v-if="panelOvertimeFormStore.isEditing()"
        color="danger"
        variant="pastel"
        @click="
          panelOvertimeListStore.onDeleteItemOvertime(
            panelOvertimeFormStore.overtimeId,
          )
        "
      >
        <Icon name="ph:trash-duotone" class="text-lg"></Icon>
        <BaseText> Delete </BaseText>
      </BaseButton>
      <BaseButton
        color="primary"
        :loading="panelOvertimeFormStore.loadingSubmitForm"
        @click="panelOvertimeFormStore.onSubmitForm()"
      >
        <Icon name="ph:floppy-disk-back-duotone" class="text-lg"></Icon>
        <BaseText> Save </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const selectionStore = useSelectionStore();
const panelOvertimeFormStore = usePanelOvertimeFormStore();
const panelOvertimeListStore = usePanelOvertimeListStore();
</script>
