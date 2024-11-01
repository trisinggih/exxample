<template>
  <BaseCard
    v-if="isNotEmptyObject(locationActivityScanStore.itemScanEmployee)"
    class="space-y-4 px-4 pb-4"
    rounded="lg"
  >
    <BaseCardHead title="Employee"></BaseCardHead>

    <div class="flex flex-col md:flex-row gap-5 relative">
      <div
        class="bg-white bg-opacity-80 absolute top-0 left-0 h-full w-full flex items-center justify-center z-[2] duration-500"
        :class="{
          'opacity-100': locationActivityScanStore.loadingSubmitScan,
          'opacity-0': !locationActivityScanStore.loadingSubmitScan,
        }"
      >
        <Icon
          name="mingcute:loading-3-fill"
          class="text-5xl animate-spin"
        ></Icon>
      </div>

      <div class="w-full md:w-1/2">
        <img
          :src="locationActivityScanStore.itemScanEmployee?.picture"
          class="w-full h-auto rounded-lg"
        />
      </div>
      <BaseCard bordered class="w-full md:w-1/2 space-y-4 p-4">
        <div class="flex flex-col">
          <BaseText as="label" weight="medium" size="sm" class="text-dark-500">
            Full Name
          </BaseText>
          <BaseText weight="semibold" size="lg" class="text-dark">
            {{ locationActivityScanStore.itemScanEmployee?.full_name }}
          </BaseText>
        </div>
        <div class="flex flex-col">
          <BaseText as="label" weight="medium" size="sm" class="text-dark-500">
            Gender
          </BaseText>
          <BaseText weight="semibold" size="lg" class="text-dark">
            {{ locationActivityScanStore.itemScanEmployee?.gender_text }}
          </BaseText>
        </div>
        <div class="flex flex-col">
          <BaseText as="label" weight="medium" size="sm" class="text-dark-500">
            Department
          </BaseText>
          <BaseText weight="semibold" size="lg" class="text-dark">
            {{ locationActivityScanStore.itemScanEmployee?.department_text }}
          </BaseText>
        </div>
        <div class="flex flex-col">
          <BaseText as="label" weight="medium" size="sm" class="text-dark-500">
            Job Position
          </BaseText>
          <BaseText weight="semibold" size="lg" class="text-dark">
            {{ locationActivityScanStore.itemScanEmployee?.job_position_text }}
          </BaseText>
        </div>
      </BaseCard>
    </div>
  </BaseCard>

  <BaseCard v-else class="space-y-4 px-4 pb-4" rounded="lg">
    <BaseCardHead title="Employee"></BaseCardHead>

    <div class="flex flex-col items-center py-20 relative">
      <div
        class="bg-white bg-opacity-80 absolute top-0 left-0 h-full w-full flex items-center justify-center z-[2] duration-500"
        :class="{
          'opacity-100': locationActivityScanStore.loadingSubmitScan,
          'opacity-0': !locationActivityScanStore.loadingSubmitScan,
        }"
      >
        <Icon
          name="mingcute:loading-3-fill"
          class="text-5xl animate-spin"
        ></Icon>
      </div>

      <BaseIconBox color="primary" rounded="full" size="lg">
        <Icon name="ph:user-circle-dashed-duotone" class="text-4xl"></Icon>
      </BaseIconBox>
      <BaseText leading="loose" class="text-slate-400">
        No employee scanned
      </BaseText>
    </div>
  </BaseCard>
</template>

<script lang="ts" setup>
import { isNotEmptyObject } from 'class-validator';

const locationActivityScanStore = useLocationActivityScanStore();
</script>
