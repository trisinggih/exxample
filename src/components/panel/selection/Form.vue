<template>
  <form @submit.prevent="panelSelectionFormStore.onSubmitForm()">
    <BaseCard rounded="lg" class="px-5 pb-5 w-full lg:w-1/2 mx-auto space-y-5">
      <BaseCardHead
        :title="
          panelSelectionFormStore.isEditing()
            ? 'Edit Selection'
            : 'Add Selection'
        "
        button-back
      ></BaseCardHead>

      <BaseText weight="medium" class="uppercase text-primary">
        Selection Data
      </BaseText>

      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'SELECTION_TYPE',
                panelSelectionFormStore.inputForm.type,
              )?.text
            "
            :error="panelSelectionFormStore.errorForm.type"
            :loading="panelSelectionFormStore.loadingItemSelection"
            label="Type"
            label-required
            placeholder="Select type"
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
            v-model="panelSelectionFormStore.inputForm.type"
            :items="selectionStore.getItemsSelectable('SELECTION_TYPE')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>

      <BaseInput
        v-model="panelSelectionFormStore.inputForm.text"
        :error="panelSelectionFormStore.errorForm.text"
        :loading="panelSelectionFormStore.loadingItemSelection"
        label="Text"
        label-required
        placeholder="Input text"
      ></BaseInput>

      <br />
      <BaseText weight="medium" class="uppercase text-primary">
        Additional Data
      </BaseText>

      <BaseInput
        v-model="panelSelectionFormStore.inputForm.color"
        :error="panelSelectionFormStore.errorForm.color"
        :loading="panelSelectionFormStore.loadingItemSelection"
        label="Color"
        placeholder="Input color"
      ></BaseInput>

      <BaseInput
        v-model="panelSelectionFormStore.inputForm.icon"
        :error="panelSelectionFormStore.errorForm.icon"
        :loading="panelSelectionFormStore.loadingItemSelection"
        label="Icon"
        placeholder="Input icon"
      ></BaseInput>

      <BaseCardAction>
        <BaseButton
          color="primary"
          type="submit"
          :loading="panelSelectionFormStore.loadingSubmitForm"
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
const panelSelectionFormStore = usePanelSelectionFormStore();

onMounted(() => {
  panelSelectionFormStore.onResetForm();

  if (panelSelectionFormStore.isEditing()) {
    panelSelectionFormStore.onFetchItemSelection();
  }
});
</script>
