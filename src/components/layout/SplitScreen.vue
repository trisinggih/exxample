<template>
  <div class="w-full min-h-screen flex flex-col lg:flex-row-reverse relative">
    <div class="w-full lg:w-1/2 h-56 lg:h-auto relative z-[1]">
      <slot name="secondary"></slot>
    </div>

    <div
      class="-mt-10 lg:mt-0 grow bg-white w-full lg:w-1/2 rounded-t-3xl lg:rounded-none flex lg:items-center justify-center p-5 z-[2]"
    >
      <div class="w-full md:w-[400px]">
        <slot name="primary"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
