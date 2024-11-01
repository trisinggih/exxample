<template>
  <div class="flex flex-col lg:flex-row gap-5">
    <div class="w-full lg:w-1/2">
      <LocationActivityEmployee></LocationActivityEmployee>
    </div>
    <div class="w-full lg:w-1/2">
      <LocationActivityList></LocationActivityList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import onScan from 'onscan.js';

definePageMeta({
  layout: 'location',
  middleware: ['location-token'],
});

const locationActivityScanStore = useLocationActivityScanStore();

onMounted(() => {
  onScan.attachTo(document, {
    onScan: (scanned) => {
      console.log(scanned);
      locationActivityScanStore.onSubmitScan(scanned);
    },
  });
});
</script>
