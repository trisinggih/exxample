<template>
  <form
    class="flex flex-col gap-5"
    @submit.prevent="locationTokenStore.onSubmitForm()"
  >
    <div>
      <BaseText as="h1" weight="bold" size="3xl" leading="loose">
        Enter Token
      </BaseText>
      <BaseText as="p" class="text-dark-400">
        Please enter the unique token here
      </BaseText>
    </div>

    <BaseInput
      v-model="locationTokenStore.inputForm.token"
      :error="locationTokenStore.errorForm.token"
      label="Token"
      placeholder="Enter token"
      :classes="{
        inputPadding: 'pl-10 pr-3',
      }"
    >
      <template #prefix>
        <div class="input-prefix-icon">
          <Icon name="ph:key-duotone" class="text-lg"></Icon>
        </div>
      </template>
    </BaseInput>

    <div class="mt-5">
      <BaseButton
        color="primary"
        type="submit"
        block
        :loading="locationTokenStore.loadingSubmitForm"
      >
        Enter
      </BaseButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
const route = useRoute();

const locationTokenStore = useLocationTokenStore();

onMounted(() => {
  if (route.query.token) {
    locationTokenStore.inputForm.token = route.query.token;
  }
});
</script>
