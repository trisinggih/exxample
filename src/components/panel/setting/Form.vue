<template>
  <form @submit.prevent="panelSettingFormStore.onSubmitForm()">
    <BaseCard rounded="lg" class="px-5 pb-5 w-full lg:w-1/2 mx-auto space-y-5">
      <BaseCardHead
        :title="
          panelSettingFormStore.isEditing() ? 'Edit Setting' : 'Add Setting'
        "
        button-back
      ></BaseCardHead>

      <BaseInput
        v-model="panelSettingFormStore.inputForm.key"
        :error="panelSettingFormStore.errorForm.key"
        :loading="panelSettingFormStore.loadingItemSetting"
        label="Key"
        label-required
        placeholder="Input key"
      ></BaseInput>

      <BaseInput
        v-model="panelSettingFormStore.inputForm.value"
        :error="panelSettingFormStore.errorForm.value"
        :loading="panelSettingFormStore.loadingItemSetting"
        label="Value"
        label-required
        placeholder="Input value"
      ></BaseInput>

      <BaseCardAction>
        <BaseButton
          color="primary"
          type="submit"
          :loading="panelSettingFormStore.loadingSubmitForm"
        >
          <Icon name="ph:floppy-disk-back-duotone" class="text-lg"></Icon>
          <BaseText> Save </BaseText>
        </BaseButton>
      </BaseCardAction>
    </BaseCard>
  </form>
</template>

<script lang="ts" setup>
const panelSettingFormStore = usePanelSettingFormStore();

onMounted(() => {
  panelSettingFormStore.onResetForm();

  if (panelSettingFormStore.isEditing()) {
    panelSettingFormStore.onFetchItemSetting();
  }
});
</script>
