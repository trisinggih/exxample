<template>
  <LayoutSplitScreen>
    <template #primary>
      <slot></slot>
    </template>

    <template #secondary>
      <div class="absolute top-0 w-full h-full grid place-content-center z-[2]">
        <div class="text-white font-semibold text-3xl lg:text-4xl">
          Welcome Back
        </div>
      </div>

      <div
        class="absolute top-0 w-full h-full bg-primary bg-opacity-70 z-[1]"
      ></div>

      <img
        src="/images/background/login-background-image.jpg"
        class="absolute top-0 w-full h-full object-cover z-[0]"
      />
    </template>
  </LayoutSplitScreen>
</template>

<script lang="ts" setup></script>
