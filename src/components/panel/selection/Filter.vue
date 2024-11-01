<template>
  <BaseModal v-model="panelSelectionListStore.isModalOpenFilter" title="Filter">
    <div class="space-y-5 my-5">
      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'SELECTION_TYPE',
                panelSelectionListStore.inputFilter.type,
              )?.text
            "
            label="Type"
            placeholder="Select type"
            readonly
            clearable
            :classes="{
              inputPadding: 'pl-3 pr-10',
              inputCursor: 'cursor-pointer',
              clearablePadding: 'pr-8',
            }"
            @click="isOpen ? onClose() : onOpen()"
            @clear="panelSelectionListStore.inputFilter.type = null"
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
            v-model="panelSelectionListStore.inputFilter.type"
            :items="selectionStore.getItemsSelectable('SELECTION_TYPE')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>
    </div>

    <BaseCardAction>
      <BaseButton @click="panelSelectionListStore.onResetFilter()">
        <Icon name="ph:x" class="text-lg"></Icon>
        <BaseText> Clear </BaseText>
      </BaseButton>
      <BaseButton
        color="primary"
        @click="panelSelectionListStore.onApplyFilter()"
      >
        <Icon name="ph:check-circle-duotone" class="text-lg"></Icon>
        <BaseText> Apply </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const selectionStore = useSelectionStore();
const panelSelectionListStore = usePanelSelectionListStore();
</script>
