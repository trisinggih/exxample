<template>
  <BaseModal v-model="panelEmployeeImportStore.isModalOpen" title="Import Data">
    <div class="space-y-5 my-5">
      <div class="space-y-0.5">
        <BaseText
          as="label"
          weight="medium"
          leading="loose"
          size="sm"
          class="text-dark-500"
        >
          Import Template
        </BaseText>
        <BaseButton
          color="success"
          variant="pastel"
          size="sm"
          @click="panelEmployeeImportStore.onDownloadTemplate()"
        >
          <Icon name="ph:file-csv-duotone" class="text-lg"></Icon>
          Download
        </BaseButton>
      </div>
      <div class="space-y-0.5">
        <BaseText
          as="label"
          weight="medium"
          leading="loose"
          size="sm"
          class="text-dark-500"
        >
          Upload File
        </BaseText>
        <BaseUploadFile
          v-model="panelEmployeeImportStore.inputForm.file"
          class="w-full"
          :accept="['.csv']"
        >
          <template #default="{ onOpen, onDrop, onRemove }">
            <div
              v-if="panelEmployeeImportStore.inputForm.file"
              class="space-y-1"
            >
              <BaseCard bordered>
                <div class="flex items-center p-3 gap-3">
                  <div>
                    <BaseIconBox size="sm" color="primary">
                      <Icon name="ph:file-text-duotone" class="text-lg"></Icon>
                    </BaseIconBox>
                  </div>
                  <div>
                    <BaseText size="sm" class="text-dark line-clamp-1">
                      {{ panelEmployeeImportStore.inputForm.file?.name }}
                    </BaseText>
                    <BaseText size="xs" class="text-slate-400 line-clamp-1">
                      {{
                        numeral(
                          panelEmployeeImportStore.inputForm.file?.size,
                        ).format('0.0b')
                      }}
                    </BaseText>
                  </div>
                  <div class="flex items-center gap-1 ml-auto">
                    <BaseTooltip text="Delete">
                      <BaseButtonIcon
                        size="sm"
                        rounded="full"
                        color="danger"
                        @click="onRemove"
                      >
                        <Icon name="ph:trash-duotone"></Icon>
                      </BaseButtonIcon>
                    </BaseTooltip>
                  </div>
                </div>
              </BaseCard>
            </div>
            <BaseDropzone
              v-else
              @on-click="onOpen"
              @on-drop="onDrop"
            ></BaseDropzone>
          </template>
        </BaseUploadFile>
      </div>
    </div>

    <BaseCardAction>
      <BaseButton
        color="primary"
        :loading="panelEmployeeImportStore.loadingSubmitForm"
        @click="panelEmployeeImportStore.onSubmitForm()"
      >
        <Icon name="ph:upload-duotone" class="text-lg"></Icon>
        Upload
      </BaseButton>
    </BaseCardAction>
  </BaseModal>
</template>

<script lang="ts" setup>
import numeral from 'numeral';

const panelEmployeeImportStore = usePanelEmployeeImportStore();
</script>
