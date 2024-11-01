<template>
  <BaseModal v-model="panelUserListStore.isModalOpenFilter" title="Filter">
    <div class="space-y-5 my-5">
      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'USER_ROLE',
                panelUserListStore.inputFilter.role,
              )?.text
            "
            label="Role"
            placeholder="Select role"
            readonly
            clearable
            :classes="{
              inputPadding: 'pl-3 pr-10',
              inputCursor: 'cursor-pointer',
              clearablePadding: 'pr-8',
            }"
            @click="isOpen ? onClose() : onOpen()"
            @clear="panelUserListStore.inputFilter.role = null"
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
            v-model="panelUserListStore.inputFilter.role"
            :items="selectionStore.getItemsSelectable('USER_ROLE')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>

      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'ACTIVATION_STATUS',
                panelUserListStore.inputFilter.status,
              )?.text
            "
            label="Status"
            placeholder="Select status"
            readonly
            clearable
            :classes="{
              inputPadding: 'pl-3 pr-10',
              inputCursor: 'cursor-pointer',
              clearablePadding: 'pr-8',
            }"
            @click="isOpen ? onClose() : onOpen()"
            @clear="panelUserListStore.inputFilter.status = null"
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
            v-model="panelUserListStore.inputFilter.status"
            :items="selectionStore.getItemsSelectable('ACTIVATION_STATUS')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>
    </div>

    <BaseCardAction>
      <BaseButton @click="panelUserListStore.onResetFilter()">
        <Icon name="ph:x" class="text-lg"></Icon>
        <BaseText> Clear </BaseText>
      </BaseButton>
      <BaseButton color="primary" @click="panelUserListStore.onApplyFilter()">
        <Icon name="ph:check-circle-duotone" class="text-lg"></Icon>
        <BaseText> Apply </BaseText>
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
const selectionStore = useSelectionStore();
const panelUserListStore = usePanelUserListStore();
</script>
