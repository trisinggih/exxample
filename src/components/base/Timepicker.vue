<template>
  <div>
    <div class="flex justify-center gap-2 p-3">
      <div
        v-if="
          props.precision === 'hour' ||
          props.precision === 'minute' ||
          props.precision === 'second'
        "
      >
        <BaseText
          size="sm"
          leading="loose"
          align="center"
          class="text-dark-400"
        >
          Hour
        </BaseText>
        <div
          ref="containerHour"
          class="min-w-20 max-h-40 overflow-auto px-3 space-y-1"
        >
          <div
            v-for="(hour, i) in itemsHour"
            :id="`option-hour-${hour}`"
            :key="i"
            :class="itemClass(inputHour === hour)"
            @click="onSelectHour(hour)"
          >
            {{ hour }}
          </div>
        </div>
      </div>

      <div v-if="props.precision === 'minute' || props.precision === 'second'">
        <BaseText
          size="sm"
          leading="loose"
          align="center"
          class="text-dark-400"
        >
          Minute
        </BaseText>
        <div
          ref="containerMinute"
          class="min-w-20 max-h-40 overflow-auto px-3 space-y-1"
        >
          <div
            v-for="(minute, i) in itemsMinute"
            :id="`option-minute-${minute}`"
            :key="i"
            :class="itemClass(inputMinute === minute)"
            @click="onSelectMinute(minute)"
          >
            {{ minute }}
          </div>
        </div>
      </div>

      <div v-if="props.precision === 'second'">
        <BaseText
          size="sm"
          leading="loose"
          align="center"
          class="text-dark-400"
        >
          Second
        </BaseText>
        <div
          ref="containerSecond"
          class="min-w-20 max-h-40 overflow-auto px-3 space-y-1"
        >
          <div
            v-for="(second, i) in itemsSecond"
            :id="`option-second-${second}`"
            :key="i"
            :class="itemClass(inputSecond === second)"
            @click="onSelectSecond(second)"
          >
            {{ second }}
          </div>
        </div>
      </div>
    </div>

    <div class="px-3 pb-3 flex justify-end">
      <BaseButton size="sm" color="primary" @click="onOk()"> Ok </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any;
  startTime?: string | null;
  endTime?: string | null;
  precision?: 'hour' | 'minute' | 'second';
}

const emits = defineEmits(['update:modelValue', 'onSelect']);
const props = withDefaults(defineProps<Props>(), {
  precision: 'second',
});

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emits('update:modelValue', value);
  },
});

const onOk = () => {
  if (!inputModel.value) {
    inputHour.value = '00';
    inputMinute.value = '00';
    inputSecond.value = '00';
    onSetTime();
  }
  nextTick(() => {
    emits('onSelect');
  });
};

const inputHour = ref('00');
const inputMinute = ref('00');
const inputSecond = ref('00');

const onSetTime = () => {
  inputModel.value = `${inputHour.value}:${inputMinute.value}:${inputSecond.value}`;
};

const onSetItemTime = () => {
  if (!inputModel.value) return;
  inputHour.value = inputModel.value?.split(':')[0];
  inputMinute.value = inputModel.value?.split(':')[1];
  inputSecond.value = inputModel.value?.split(':')[2];
};

const containerHour = ref();
const onScrollToSelectedHour = () => {
  setTimeout(() => {
    const elOption: any = document.getElementById(
      `option-hour-${inputHour.value}`,
    );

    containerHour.value?.scrollTo({
      top: elOption ? elOption?.offsetTop - 100 : 0,
      behavior: 'smooth',
    });
  }, 100);
};

const containerMinute = ref();
const onScrollToSelectedMinute = () => {
  setTimeout(() => {
    const elOption: any = document.getElementById(
      `option-minute-${inputMinute.value}`,
    );

    containerMinute.value?.scrollTo({
      top: elOption ? elOption?.offsetTop - 100 : 0,
      behavior: 'smooth',
    });
  }, 100);
};

const containerSecond = ref();
const onScrollToSelectedSecond = () => {
  setTimeout(() => {
    const elOption: any = document.getElementById(
      `option-second-${inputSecond.value}`,
    );

    containerSecond.value?.scrollTo({
      top: elOption ? elOption?.offsetTop - 100 : 0,
      behavior: 'smooth',
    });
  }, 100);
};

const itemsHour = computed(() => {
  const arr: string[] = [];
  for (let i = 0; i <= 23; i++) {
    arr.push(i.toString().padStart(2, '0'));
  }
  return arr;
});

const itemsMinute = computed(() => {
  const arr: string[] = [];
  for (let i = 0; i <= 59; i++) {
    arr.push(i.toString().padStart(2, '0'));
  }
  return arr;
});

const itemsSecond = computed(() => {
  const arr: string[] = [];
  for (let i = 0; i <= 59; i++) {
    arr.push(i.toString().padStart(2, '0'));
  }
  return arr;
});

const onSelectHour = (value: string) => {
  inputHour.value = value;
  onSetTime();
  if (props.precision === 'hour') {
    nextTick(() => {
      emits('onSelect');
    });
  }
};

const onSelectMinute = (value: string) => {
  inputMinute.value = value;
  onSetTime();
  if (props.precision === 'minute') {
    nextTick(() => {
      emits('onSelect');
    });
  }
};

const onSelectSecond = (value: string) => {
  inputSecond.value = value;
  onSetTime();
  if (props.precision === 'second') {
    nextTick(() => {
      emits('onSelect');
    });
  }
};

const itemClass = (isActive: boolean) => {
  const baseClass: string[] = [];

  baseClass.push('w-full h-8 flex items-center justify-center');
  baseClass.push('cursor-pointer rounded-lg duration-300');

  if (isActive) {
    baseClass.push('bg-primary-50 text-primary');
  } else {
    baseClass.push('hover:bg-slate-100');
  }

  return baseClass.join(' ');
};

onMounted(() => {
  onSetItemTime();
  nextTick(() => {
    onScrollToSelectedHour();
    onScrollToSelectedMinute();
    onScrollToSelectedSecond();
  });
});
</script>
