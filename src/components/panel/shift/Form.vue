<template>
  <form @submit.prevent="panelShiftFormStore.onSubmitForm()">
    <BaseCard rounded="lg" class="px-5 pb-5 w-full lg:w-2/3 mx-auto space-y-5">
      <BaseCardHead
        :title="panelShiftFormStore.isEditing() ? 'Edit Shift' : 'Add Shift'"
        button-back
      ></BaseCardHead>

      <BaseInput
        v-model="panelShiftFormStore.inputForm.name"
        :error="panelShiftFormStore.errorForm.name"
        :loading="panelShiftFormStore.loadingItemShift"
        label="Name"
        label-required
        placeholder="Input name"
      ></BaseInput>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelShiftFormStore.inputForm.start_time"
              :error="panelShiftFormStore.errorForm.start_time"
              :loading="panelShiftFormStore.loadingItemShift"
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
              v-model="panelShiftFormStore.inputForm.start_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="panelShiftFormStore.inputForm.end_time"
              :error="panelShiftFormStore.errorForm.end_time"
              :loading="panelShiftFormStore.loadingItemShift"
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
              v-model="panelShiftFormStore.inputForm.end_time"
              @on-select="onClose()"
            ></BaseTimepicker>
          </template>
        </BaseDropdown>
      </div>

      <BaseCardAction>
        <BaseButton
          color="primary"
          type="submit"
          :loading="panelShiftFormStore.loadingSubmitForm"
        >
          <Icon name="ph:floppy-disk-back-duotone" class="text-lg"></Icon>
          <BaseText> Save </BaseText>
        </BaseButton>
      </BaseCardAction>
    </BaseCard>
  </form>
</template>

<script lang="ts" setup>
const panelShiftFormStore = usePanelShiftFormStore();

onMounted(() => {
  panelShiftFormStore.onResetForm();

  if (panelShiftFormStore.isEditing()) {
    panelShiftFormStore.onFetchItemShift();
  }
});
</script>
