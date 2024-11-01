<template>
  <BaseModal
    v-model="dialogStore.isModalOpen"
    :title="dialogStore.dialog.title"
    :classes="{
      modal: 'w-11/12 sm:w-1/2 lg:w-3/12',
    }"
  >
    <div v-if="dialogStore.dialog.icon" class="flex justify-center mt-7">
      <BaseIconBox
        :color="dialogStore.dialog.colorIcon || 'primary'"
        size="lg"
        rounded="full"
      >
        <Icon :name="dialogStore.dialog.icon" class="text-3xl"></Icon>
      </BaseIconBox>
    </div>

    <BaseText align="center" class="mt-4">
      {{ dialogStore.dialog.message }}
    </BaseText>

    <div
      v-if="['confirm', 'delete'].includes(dialogStore.dialog.type)"
      class="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-7"
    >
      <BaseButton
        :loading="loadingCancel"
        :color="dialogStore.dialog.colorCancel"
        @click="onCancel()"
      >
        {{ dialogStore.dialog.textCancel || 'Cancel' }}
      </BaseButton>
      <BaseButton
        :loading="loadingOk"
        :color="dialogStore.dialog.colorOk || 'primary'"
        class="row-start-1 lg:col-start-2"
        @click="onOk()"
      >
        {{ dialogStore.dialog.textOk || 'Ok' }}
      </BaseButton>
    </div>

    <div v-if="['success'].includes(dialogStore.dialog.type)" class="mt-7">
      <BaseButton
        :loading="loadingOk"
        :color="dialogStore.dialog.colorOk || 'primary'"
        @click="onOk()"
      >
        {{ dialogStore.dialog.textOk || 'Ok' }}
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
const dialogStore = useDialogStore();

const loadingOk = ref(false);
const onOk = async () => {
  loadingOk.value = true;
  if (dialogStore.dialog.onOk) {
    await dialogStore.dialog.onOk();
  } else {
    dialogStore.close();
  }
  loadingOk.value = false;
};

const loadingCancel = ref(false);
const onCancel = async () => {
  loadingCancel.value = true;
  if (dialogStore.dialog.onCancel) {
    await dialogStore.dialog.onCancel();
  } else {
    dialogStore.close();
  }
  loadingCancel.value = false;
};
</script>
