<template>
  <form @submit.prevent="panelUserFormStore.onSubmitForm()">
    <BaseCard rounded="lg" class="px-5 pb-5 w-full lg:w-1/2 mx-auto space-y-5">
      <BaseCardHead
        :title="panelUserFormStore.isEditing() ? 'Edit User' : 'Add User'"
        button-back
      ></BaseCardHead>

      <BaseInput
        v-model="panelUserFormStore.inputForm.name"
        :error="panelUserFormStore.errorForm.name"
        :loading="panelUserFormStore.loadingItemUser"
        label="Name"
        label-required
        placeholder="Input name"
      ></BaseInput>

      <BaseInput
        v-model="panelUserFormStore.inputForm.email"
        :error="panelUserFormStore.errorForm.email"
        :loading="panelUserFormStore.loadingItemUser"
        label="Email"
        label-required
        placeholder="Input email"
      ></BaseInput>

      <BaseDropdown :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }">
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              selectionStore.getSelectable(
                'USER_ROLE',
                panelUserFormStore.inputForm.role,
              )?.text
            "
            :error="panelUserFormStore.errorForm.role"
            :loading="panelUserFormStore.loadingItemUser"
            label="Role"
            label-required
            placeholder="Select role"
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
            v-model="panelUserFormStore.inputForm.role"
            :items="selectionStore.getItemsSelectable('USER_ROLE')"
            @on-select="onClose()"
          ></BaseListSelection>
        </template>
      </BaseDropdown>

      <BaseDropdown
        v-if="panelUserFormStore.inputForm.role === 'SUPERVISOR'"
        :classes="{ dropdown: 'w-full overflow-y-auto' }"
      >
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              panelUserFormStore.inputForm.supervisor_locations
                ?.map((value: any) => {
                  return selectionStore.getSelectable('LOCATION', value)?.text;
                })
                ?.join(', ')
            "
            :error="panelUserFormStore.errorForm.supervisor_locations"
            :loading="panelUserFormStore.loadingItemUser"
            label="Locations"
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
                v-model="panelUserFormStore.inputForm.supervisor_locations"
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

      <BaseDropdown
        v-if="panelUserFormStore.inputForm.role === 'SUPERVISOR'"
        :classes="{ dropdown: 'w-full overflow-y-auto' }"
      >
        <template #activator="{ isOpen, onOpen, onClose }">
          <BaseInput
            :model-value="
              panelUserFormStore.inputForm.supervisor_job_positions
                ?.map((value: any) => {
                  return selectionStore.getSelectable('JOB_POSITION', value)
                    ?.text;
                })
                ?.join(', ')
            "
            :error="panelUserFormStore.errorForm.supervisor_job_positions"
            :loading="panelUserFormStore.loadingItemUser"
            label="Job Positions"
            placeholder="Select job positions"
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
                v-model="panelUserFormStore.inputForm.supervisor_job_positions"
                :items="selectionStore.getItemsSelectable('JOB_POSITION')"
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

      <BaseInput
        v-model="panelUserFormStore.inputForm.password"
        :error="panelUserFormStore.errorForm.password"
        :loading="panelUserFormStore.loadingItemUser"
        :type="showPassword ? 'text' : 'password'"
        :clearable="panelUserFormStore.isEditing()"
        :label="panelUserFormStore.isEditing() ? 'New Password' : 'Password'"
        label-required
        placeholder="Input password"
        :classes="{
          inputPadding: 'pl-3 pr-10',
        }"
      >
        <template #suffix>
          <button
            type="button"
            class="input-suffix-icon"
            @click="showPassword = !showPassword"
          >
            <Icon
              :name="showPassword ? 'ph:eye-duotone' : 'ph:eye-slash-duotone'"
              class="text-xl"
            ></Icon>
          </button>
        </template>
      </BaseInput>

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
            v-model="panelUserFormStore.inputForm.is_active"
            text-true="Active"
            text-false="Inactive"
          ></BaseSwitch>
        </div>
      </div>

      <BaseCardAction>
        <BaseButton
          color="primary"
          type="submit"
          :loading="panelUserFormStore.loadingSubmitForm"
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
const panelUserFormStore = usePanelUserFormStore();

const showPassword = ref(false);

onMounted(() => {
  selectionStore.onFetchItemsSelectable('LOCATION');
  panelUserFormStore.onResetForm();

  if (panelUserFormStore.isEditing()) {
    panelUserFormStore.onFetchItemUser();
  }
});
</script>
