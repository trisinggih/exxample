<template>
  <form @submit.prevent="panelLocationFormStore.onSubmitForm()">
    <BaseCard rounded="lg" class="px-5 pb-5 w-full lg:w-1/2 mx-auto space-y-5">
      <BaseCardHead
        :title="
          panelLocationFormStore.isEditing() ? 'Edit Location' : 'Add Location'
        "
        button-back
      ></BaseCardHead>

      <BaseInput
        v-model="panelLocationFormStore.inputForm.name"
        :error="panelLocationFormStore.errorForm.name"
        :loading="panelLocationFormStore.loadingItemLocation"
        label="Name"
        label-required
        placeholder="Input name"
      ></BaseInput>

      <BaseTextarea
        v-model="panelLocationFormStore.inputForm.address"
        :error="panelLocationFormStore.errorForm.address"
        :loading="panelLocationFormStore.loadingItemLocation"
        label="Address"
        label-required
        placeholder="Input address"
      ></BaseTextarea>

      <BaseInput
        v-model="panelLocationFormStore.inputForm.token"
        :error="panelLocationFormStore.errorForm.token"
        :loading="panelLocationFormStore.loadingItemLocation"
        label="Token"
        label-required
        placeholder="Input token"
      ></BaseInput>

      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'location_scan_type',
                panelLocationFormStore.inputForm.scan_type,
              )?.text
            "
            :error="panelLocationFormStore.errorForm.scan_type"
            label="Scan Type"
            label-required
            placeholder="Select scan type"
            readonly
            :classes="{
              inputPadding: 'pl-3 pr-10',
              inputCursor: 'cursor-pointer',
              clearablePadding: 'pr-8',
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
            v-model="panelLocationFormStore.inputForm.scan_type"
            :items="selectionStore.getItemsSelectable('location_scan_type')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>

      <BaseInput
        v-model="panelLocationFormStore.inputForm.max_scan_daily_shift"
        :error="panelLocationFormStore.errorForm.max_scan_daily_shift"
        :loading="panelLocationFormStore.loadingItemLocation"
        label="Max Scan Daily Shift"
        placeholder="Example: 1"
        clearable
        @clear="panelLocationFormStore.inputForm.max_scan_daily_shift = null"
      ></BaseInput>

      <BaseInput
        v-model="panelLocationFormStore.inputForm.max_scan_daily_overtime"
        :error="panelLocationFormStore.errorForm.max_scan_daily_overtime"
        :loading="panelLocationFormStore.loadingItemLocation"
        label="Max Scan Daily Overtime"
        placeholder="Example: 1"
        clearable
        @clear="panelLocationFormStore.inputForm.max_scan_daily_overtime = null"
      ></BaseInput>

      <div>
        <BaseText
          as="label"
          weight="medium"
          leading="loose"
          size="sm"
          class="text-dark-500"
        >
          Is Must Scan in Shift Time
        </BaseText>
        <div class="w-full">
          <BaseSwitch
            v-model="panelLocationFormStore.inputForm.is_must_scan_in_shift"
            text-true="Yes"
            text-false="No"
          ></BaseSwitch>
        </div>
      </div>

      <div>
        <BaseText
          as="label"
          weight="medium"
          leading="loose"
          size="sm"
          class="text-dark-500"
        >
          Is Must Scan in Overtime Time
        </BaseText>
        <div class="w-full">
          <BaseSwitch
            v-model="panelLocationFormStore.inputForm.is_must_scan_in_overtime"
            text-true="Yes"
            text-false="No"
          ></BaseSwitch>
        </div>
      </div>

      <div>
        <BaseText
          as="label"
          weight="medium"
          leading="loose"
          size="sm"
          class="text-dark-500"
        >
          Status
        </BaseText>
        <div class="w-full">
          <BaseSwitch
            v-model="panelLocationFormStore.inputForm.is_active"
            text-true="Active"
            text-false="Inactive"
          ></BaseSwitch>
        </div>
      </div>

      <BaseCardAction>
        <BaseButton
          color="primary"
          type="submit"
          :loading="panelLocationFormStore.loadingSubmitForm"
        >
          <Icon name="ph:floppy-disk-back-duotone" class="text-lg"></Icon>
          <BaseText> Save </BaseText>
        </BaseButton>
      </BaseCardAction>
    </BaseCard>
  </form>
</template>

<script lang="ts" setup>
const selectionStore = useSelectionStore();
const panelLocationFormStore = usePanelLocationFormStore();

onMounted(() => {
  panelLocationFormStore.onResetForm();

  if (panelLocationFormStore.isEditing()) {
    panelLocationFormStore.onFetchItemLocation();
  }
});
</script>
