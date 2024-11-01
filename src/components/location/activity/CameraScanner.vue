<template>
  <div class="space-y-5">
    <div
      class="w-full aspect-square rounded-xl overflow-hidden duration-500"
      :class="{
        'bg-slate-300': isShowCamera,
        'bg-slate-950': !isShowCamera,
        'animate-pulse': loadingCamera,
      }"
    >
      <QrcodeStream
        v-if="isShowCamera"
        :constraints="{ facingMode: cameraMode }"
        :paused="isCameraPaused"
        :track="onTrackQrCode"
        @camera-on="onCameraReady"
        @detect="onDetect"
        @error="onCameraError"
      ></QrcodeStream>
    </div>

    <div class="space-y-3">
      <BaseButton
        v-if="!isCameraReady"
        :loading="loadingCamera"
        color="primary"
        block
        @click="onStartCamera()"
      >
        <Icon name="ph:camera-duotone" class="text-xl"></Icon>
        Start Camera
      </BaseButton>
      <BaseButton v-else color="danger" block @click="onTurnOffCamera()">
        <Icon name="ph:camera-slash-duotone" class="text-xl"></Icon>
        Turn Off Camera
      </BaseButton>

      <BaseButton
        v-if="isCameraReady"
        :loading="loadingCamera"
        block
        @click="onToggleCameraMode()"
      >
        <Icon name="ph:camera-rotate-duotone" class="text-xl"></Icon>
        Toggle Camera Mode
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QrcodeStream } from 'vue-qrcode-reader';

const toastStore = useToastStore();
const locationActivityScanStore = useLocationActivityScanStore();

const isShowCamera = ref(false);
const isCameraPaused = ref(false);
const isCameraReady = ref(false);

const loadingCamera = ref(false);
const onStartCamera = () => {
  loadingCamera.value = true;
  isShowCamera.value = true;
  isCameraReady.value = false;
};

const onTurnOffCamera = () => {
  loadingCamera.value = false;
  isShowCamera.value = false;
  isCameraReady.value = false;
};

const cameraMode = ref('environment');
const onToggleCameraMode = () => {
  loadingCamera.value = true;
  if (cameraMode.value === 'user') {
    cameraMode.value = 'environment';
  } else {
    cameraMode.value = 'user';
  }
};

const cameraCapabilities = ref({} as any);
const onCameraReady = (capabilities: any) => {
  cameraCapabilities.value = capabilities;
  loadingCamera.value = false;
  isCameraReady.value = true;
};

const onCameraError = (error: any) => {
  let message = '';

  if (error.name === 'NotAllowedError') {
    message = 'Camera Not Allowed';
  } else if (error.name === 'NotFoundError') {
    message = 'No Camera Found';
  } else if (error.name === 'NotSupportedError') {
    message = 'Securty Error (Not HTTPS)';
  } else if (error.name === 'NotReadableError') {
    message = 'Camera Already In Use';
  } else if (error.name === 'OverconstrainedError') {
    message = 'Front Camera Not Found';
  } else if (error.name === 'StreamApiNotSupportedError') {
    message = 'Browser Not Supported';
  }

  toastStore.open({
    color: 'danger',
    message: message,
  });
};

const onTrackQrCode = (detectedCodes: any, ctx: any) => {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.lineWidth = 5;
    ctx.closePath();
    ctx.stroke();
  }
};

const onDetect = (detectedCodes: any) => {
  setTimeout(async () => {
    isCameraPaused.value = true;

    for (const detectedCode of detectedCodes) {
      const format = detectedCode.format;
      const rawValue = detectedCode.rawValue;

      if (format === 'qr_code') {
        await locationActivityScanStore.onSubmitScan(rawValue);

        isCameraPaused.value = false;
      }
    }
  }, 1000);
};
</script>
