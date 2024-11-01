<template>
  <BaseModal
    v-model="panelEmployeeLocationFormStore.isModalOpenForm"
    :title="
      panelEmployeeLocationFormStore.isEditing()
        ? 'Edit Employee Location'
        : 'Add Employee Location'
    "
  >
    <div class="space-y-5 my-5">
      <BaseDropdown :classes="{ dropdown: 'w-full' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              panelEmployeeLocationFormStore.inputForm.locations
                ?.map((value: any) => {
                  return selectionStore.getSelectable('LOCATION', value)?.text;
                })
                ?.join(', ')
            "
            :error="panelEmployeeLocationFormStore.errorForm.role"
            :loading="selectionStore.loadingItemsSelectable"
            label="Locations"
            label-required
            placeholder="Select locations"
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
          <div class="flex flex-col gap-2">
            <div class="max-h-44 overflow-y-auto">
              <BaseListSelection
                v-model="panelEmployeeLocationFormStore.inputForm.locations"
                :items="selectionStore.getItemsSelectable('LOCATION')"
                multiple
              >
              </BaseListSelection>
            </div>
            <div class="flex justify-end px-2 pb-2">
              <BaseButton color="primary" size="sm" @click="onClose()">
                Ok
              </BaseButton>
            </div>
          </div>
        </template>
      </BaseDropdown>
    </div>

    <BaseCardAction>
      <BaseButton
        v-if="panelEmployeeLocationFormStore.isEditing()"
        color="danger"
        variant="pastel"
        @click="
          panelEmployeeLocationListStore.onDeleteItemEmployeeLocation(
            panelEmployeeLocationFormStore.employeeLocationId,
          )
        "
      >
        <Icon name="ph:trash-duotone" class="text-lg"></Icon>
        <BaseText> Delete </BaseText>
      </BaseButton>
      <BaseButton
        color="primary"
        :loading="panelEmployeeLocationFormStore.loadingSubmitForm"
        @click="panelEmployeeLocationFormStore.onSubmitForm()"
      >
        <Icon name="ph:floppy-disk-back-duotone" class="text-lg"></Icon>
        <BaseText> Save </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const selectionStore = useSelectionStore();
const panelEmployeeLocationFormStore = usePanelEmployeeLocationFormStore();
const panelEmployeeLocationListStore = usePanelEmployeeLocationListStore();
</script>
