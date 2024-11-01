<template>
  <form class="space-y-5" @submit.prevent="authStore.onSubmitForm()">
    <div>
      <BaseText as="h1" weight="bold" size="3xl" leading="loose">
        Login
      </BaseText>
      <BaseText as="p" class="text-dark-400">
        Please enter your email and password
      </BaseText>
    </div>

    <BaseInput
      v-model="authStore.inputForm.email"
      :error="authStore.errorForm.email"
      label="Email"
      placeholder="Enter email"
      :classes="{
        inputPadding: 'pl-10 pr-3',
      }"
    >
      <template #prefix>
        <div class="input-prefix-icon">
          <Icon name="ph:envelope-simple-duotone" class="text-lg"></Icon>
        </div>
      </template>
    </BaseInput>

    <BaseInput
      v-model="authStore.inputForm.password"
      :error="authStore.errorForm.password"
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      placeholder="Enter password"
      :classes="{
        inputPadding: 'pl-10 pr-10',
      }"
    >
      <template #prefix>
        <div class="input-prefix-icon">
          <Icon name="ph:lock-duotone" class="text-lg"></Icon>
        </div>
      </template>
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

    <div class="mt-5">
      <BaseButton
        color="primary"
        type="submit"
        block
        :loading="authStore.loadingSubmitForm"
      >
        Login
      </BaseButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();

const showPassword = ref(false);
</script>
