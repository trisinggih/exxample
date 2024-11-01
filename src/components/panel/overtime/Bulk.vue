<template>
  <BaseModal
    v-model="panelOvertimeBulkStore.isModalOpenForm"
    title="Edit Overtime"
    :classes="{
      modal: 'w-11/12 md:w-10/12 lg:w-7/12 xl:w-1/2',
    }"
  >
    <div class="space-y-5 my-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseInput
          :model-value="
            getDateFormat(panelOvertimeBulkStore.inputForm.from_date, 'full')
          "
          :error="panelOvertimeBulkStore.errorForm.from_date"
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
            getDateFormat(panelOvertimeBulkStore.inputForm.to_date, 'full')
          "
          :error="panelOvertimeBulkStore.errorForm.to_date"
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelOvertimeBulkStore.inputForm.start_time"
              :error="panelOvertimeBulkStore.errorForm.start_time"
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
              @clear="panelOvertimeBulkStore.inputForm.start_time"
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
              v-model="panelOvertimeBulkStore.inputForm.start_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelOvertimeBulkStore.inputForm.end_time"
              :error="panelOvertimeBulkStore.errorForm.end_time"
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
              @clear="panelOvertimeBulkStore.inputForm.start_time"
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
              v-model="panelOvertimeBulkStore.inputForm.end_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>
      </div>
    </div>

    <BaseCardAction>
      <BaseButton
        color="primary"
        :loading="panelOvertimeBulkStore.loadingSubmitForm"
        @click="panelOvertimeBulkStore.onSubmitForm()"
      >
        <Icon name="ph:floppy-disk-back-duotone" class="text-lg"></Icon>
        <BaseText> Save </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const panelOvertimeBulkStore = usePanelOvertimeBulkStore();
</script>
