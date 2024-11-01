<template>
  <form @submit.prevent="panelEmployeeFormStore.onSubmitForm()">
    <BaseCard
      rounded="lg"
      class="px-5 pb-5 w-full lg:w-10/12 mx-auto space-y-5"
    >
      <BaseCardHead
        :title="
          panelEmployeeFormStore.isEditing() ? 'Edit Employee' : 'Add Employee'
        "
        button-back
      ></BaseCardHead>

      <div>
        <BaseText
          as="label"
          weight="medium"
          leading="loose"
          size="sm"
          class="text-dark-500"
        >
          Picture
        </BaseText>
        <div class="w-full">
          <BaseUploadFile
            v-model="panelEmployeeFormStore.inputForm.file_picture"
          >
            <template #default="{ onOpen, onRemove, preview }">
              <div class="relative">
                <BaseAvatar
                  :src="
                    preview ||
                    panelEmployeeFormStore.inputForm.picture ||
                    getAvatarDefault(panelEmployeeFormStore.inputForm.gender)
                  "
                  :loading="panelEmployeeFormStore.loadingItemEmployee"
                  size="3xl"
                ></BaseAvatar>
                <div class="absolute bottom-0 right-0">
                  <BaseTooltip
                    v-if="panelEmployeeFormStore.inputForm.picture"
                    text="Remove"
                  >
                    <BaseButtonIcon
                      size="sm"
                      rounded="full"
                      @click="panelEmployeeFormStore.inputForm.picture = null"
                    >
                      <Icon name="ph:x-bold"></Icon>
                    </BaseButtonIcon>
                  </BaseTooltip>
                  <BaseTooltip v-else-if="preview" text="Remove">
                    <BaseButtonIcon
                      size="sm"
                      rounded="full"
                      @click="onRemove()"
                    >
                      <Icon name="ph:x-bold"></Icon>
                    </BaseButtonIcon>
                  </BaseTooltip>
                  <BaseTooltip v-else text="Upload">
                    <BaseButtonIcon size="sm" rounded="full" @click="onOpen()">
                      <Icon name="ph:plus-bold"></Icon>
                    </BaseButtonIcon>
                  </BaseTooltip>
                </div>
              </div>
            </template>
          </BaseUploadFile>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseInput
          v-model="panelEmployeeFormStore.inputForm.employee_identity_number"
          :error="panelEmployeeFormStore.errorForm.employee_identity_number"
          :loading="panelEmployeeFormStore.loadingItemEmployee"
          label="Employee ID"
          label-required
          placeholder="Input employee ID"
        ></BaseInput>

        <BaseInput
          v-model="panelEmployeeFormStore.inputForm.full_name"
          :error="panelEmployeeFormStore.errorForm.full_name"
          :loading="panelEmployeeFormStore.loadingItemEmployee"
          label="Full Name"
          label-required
          placeholder="Input full name"
        ></BaseInput>
      </div>

      <div class="space-y-1">
        <BaseText
          as="label"
          weight="medium"
          leading="loose"
          size="sm"
          class="text-dark-500"
        >
          Gender
        </BaseText>
        <div class="w-full flex flex-col md:flex-row gap-4">
          <BaseRadio
            v-for="(obj, i) in selectionStore.getItemsSelectable('gender')"
            :key="i"
            v-model="panelEmployeeFormStore.inputForm.gender"
            name="gender"
            :value="obj.value"
            :text="obj.text"
          ></BaseRadio>
        </div>
      </div>

      <BaseInput
        v-model="panelEmployeeFormStore.inputForm.phone"
        :error="panelEmployeeFormStore.errorForm.phone"
        :loading="panelEmployeeFormStore.loadingItemEmployee"
        label="Phone"
        label-required
        placeholder="+62"
      ></BaseInput>

      <BaseTextarea
        v-model="panelEmployeeFormStore.inputForm.address"
        :error="panelEmployeeFormStore.errorForm.address"
        :loading="panelEmployeeFormStore.loadingItemEmployee"
        label="Address"
        placeholder="Input address"
      ></BaseTextarea>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseDropdown
          :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }"
        >
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                selectionStore.getSelectable(
                  'BRANCH',
                  panelEmployeeFormStore.inputForm.branch,
                )?.text
              "
              :error="panelEmployeeFormStore.errorForm.branch"
              :loading="panelEmployeeFormStore.loadingItemEmployee"
              label="Branch"
              label-required
              placeholder="Select branch"
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
              v-model="panelEmployeeFormStore.inputForm.branch"
              :items="selectionStore.getItemsSelectable('BRANCH')"
              @on-select="onClose()"
            ></BaseListSelection>
          </template>
        </BaseDropdown>

        <BaseDropdown
          :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }"
        >
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                selectionStore.getSelectable(
                  'DEPARTMENT',
                  panelEmployeeFormStore.inputForm.department,
                )?.text
              "
              :error="panelEmployeeFormStore.errorForm.department"
              :loading="panelEmployeeFormStore.loadingItemEmployee"
              label="Department"
              label-required
              placeholder="Select department"
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
              v-model="panelEmployeeFormStore.inputForm.department"
              :items="selectionStore.getItemsSelectable('DEPARTMENT')"
              @on-select="onClose()"
            ></BaseListSelection>
          </template>
        </BaseDropdown>

        <BaseDropdown
          :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }"
        >
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                selectionStore.getSelectable(
                  'JOB_POSITION',
                  panelEmployeeFormStore.inputForm.job_position,
                )?.text
              "
              :error="panelEmployeeFormStore.errorForm.job_position"
              :loading="panelEmployeeFormStore.loadingItemEmployee"
              label="Job Position"
              label-required
              placeholder="Select job position"
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
              v-model="panelEmployeeFormStore.inputForm.job_position"
              :items="selectionStore.getItemsSelectable('JOB_POSITION')"
              @on-select="onClose()"
            ></BaseListSelection>
          </template>
        </BaseDropdown>

        <BaseDropdown
          :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }"
        >
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                selectionStore.getSelectable(
                  'JOB_LEVEL',
                  panelEmployeeFormStore.inputForm.job_level,
                )?.text
              "
              :error="panelEmployeeFormStore.errorForm.job_level"
              :loading="panelEmployeeFormStore.loadingItemEmployee"
              label="Job Level"
              label-required
              placeholder="Select job level"
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
              v-model="panelEmployeeFormStore.inputForm.job_level"
              :items="selectionStore.getItemsSelectable('JOB_LEVEL')"
              @on-select="onClose()"
            ></BaseListSelection>
          </template>
        </BaseDropdown>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseDropdown :classes="{ dropdown: 'min-w-80 h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                getDateFormat(
                  panelEmployeeFormStore.inputForm.join_date,
                  'full',
                )
              "
              :error="panelEmployeeFormStore.errorForm.join_date"
              :loading="panelEmployeeFormStore.loadingItemEmployee"
              label="Join Date"
              label-required
              placeholder="Choose date"
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
                  <Icon name="ph:calendar-blank-duotone"></Icon>
                </div>
              </template>
            </BaseInput>
          </template>
          <template #default="{ onClose }">
            <BaseDatepicker
              v-model="panelEmployeeFormStore.inputForm.join_date"
              @on-select="onClose()"
            ></BaseDatepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'min-w-80 h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                getDateFormat(
                  panelEmployeeFormStore.inputForm.sign_date,
                  'full',
                )
              "
              :error="panelEmployeeFormStore.errorForm.sign_date"
              :loading="panelEmployeeFormStore.loadingItemEmployee"
              label="Sign Date"
              placeholder="Choose date"
              readonly
              clearable
              :classes="{
                inputPadding: 'pl-3 pr-16',
                inputCursor: 'cursor-pointer',
                clearablePadding: 'pr-7',
              }"
              @clear="panelEmployeeFormStore.inputForm.sign_date = null"
              @click="isOpen ? onClose() : onOpen()"
            >
              <template #suffix>
                <div
                  class="input-suffix-icon cursor-pointer"
                  @click="isOpen ? onClose() : onOpen()"
                >
                  <Icon name="ph:calendar-blank-duotone"></Icon>
                </div>
              </template>
            </BaseInput>
          </template>
          <template #default="{ onClose }">
            <BaseDatepicker
              v-model="panelEmployeeFormStore.inputForm.sign_date"
              @on-select="onClose()"
            ></BaseDatepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'min-w-80 h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                getDateFormat(panelEmployeeFormStore.inputForm.end_date, 'full')
              "
              :error="panelEmployeeFormStore.errorForm.end_date"
              :loading="panelEmployeeFormStore.loadingItemEmployee"
              label="End Date"
              placeholder="Choose date"
              readonly
              clearable
              :classes="{
                inputPadding: 'pl-3 pr-16',
                inputCursor: 'cursor-pointer',
                clearablePadding: 'pr-7',
              }"
              @clear="panelEmployeeFormStore.inputForm.end_date = null"
              @click="isOpen ? onClose() : onOpen()"
            >
              <template #suffix>
                <div
                  class="input-suffix-icon cursor-pointer"
                  @click="isOpen ? onClose() : onOpen()"
                >
                  <Icon name="ph:calendar-blank-duotone"></Icon>
                </div>
              </template>
            </BaseInput>
          </template>
          <template #default="{ onClose }">
            <BaseDatepicker
              v-model="panelEmployeeFormStore.inputForm.end_date"
              @on-select="onClose()"
            ></BaseDatepicker>
          </template>
        </BaseDropdown>

        <BaseDropdown :classes="{ dropdown: 'min-w-80 h-fit' }">
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                getDateFormat(
                  panelEmployeeFormStore.inputForm.resign_date,
                  'full',
                )
              "
              :error="panelEmployeeFormStore.errorForm.resign_date"
              :loading="panelEmployeeFormStore.loadingItemEmployee"
              label="Resign Date"
              placeholder="Choose date"
              readonly
              clearable
              :classes="{
                inputPadding: 'pl-3 pr-16',
                inputCursor: 'cursor-pointer',
                clearablePadding: 'pr-7',
              }"
              @clear="panelEmployeeFormStore.inputForm.resign_date = null"
              @click="isOpen ? onClose() : onOpen()"
            >
              <template #suffix>
                <div
                  class="input-suffix-icon cursor-pointer"
                  @click="isOpen ? onClose() : onOpen()"
                >
                  <Icon name="ph:calendar-blank-duotone"></Icon>
                </div>
              </template>
            </BaseInput>
          </template>
          <template #default="{ onClose }">
            <BaseDatepicker
              v-model="panelEmployeeFormStore.inputForm.resign_date"
              @on-select="onClose()"
            ></BaseDatepicker>
          </template>
        </BaseDropdown>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseDropdown
          :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }"
        >
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                selectionStore.getSelectable(
                  'EMPLOYEE_STATUS',
                  panelEmployeeFormStore.inputForm.employee_status,
                )?.text
              "
              :error="panelEmployeeFormStore.errorForm.employee_status"
              :loading="panelEmployeeFormStore.loadingItemEmployee"
              label="Employee Status"
              label-required
              placeholder="Select employee status"
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
              v-model="panelEmployeeFormStore.inputForm.employee_status"
              :items="selectionStore.getItemsSelectable('EMPLOYEE_STATUS')"
              @on-select="onClose()"
            ></BaseListSelection>
          </template>
        </BaseDropdown>

        <BaseDropdown
          :classes="{ dropdown: 'w-full max-h-52 overflow-y-auto' }"
        >
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="
                selectionStore.getSelectable(
                  'TAX_STATUS',
                  panelEmployeeFormStore.inputForm.tax_status,
                )?.text
              "
              :error="panelEmployeeFormStore.errorForm.tax_status"
              :loading="panelEmployeeFormStore.loadingItemEmployee"
              label="Tax Status"
              label-required
              placeholder="Select tax status"
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
              v-model="panelEmployeeFormStore.inputForm.tax_status"
              :items="selectionStore.getItemsSelectable('TAX_STATUS')"
              @on-select="onClose()"
            ></BaseListSelection>
          </template>
        </BaseDropdown>
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
            v-model="panelEmployeeFormStore.inputForm.is_active"
            text-true="Active"
            text-false="Inactive"
          ></BaseSwitch>
        </div>
      </div>

      <BaseCardAction>
        <BaseButton
          color="primary"
          type="submit"
          :loading="panelEmployeeFormStore.loadingSubmitForm"
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
const panelEmployeeFormStore = usePanelEmployeeFormStore();

onMounted(() => {
  panelEmployeeFormStore.onResetForm();

  if (panelEmployeeFormStore.isEditing()) {
    panelEmployeeFormStore.onFetchItemEmployee();
  }
});
</script>
