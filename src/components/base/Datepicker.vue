<template>
  <div v-if="selectType === 'year'" class="w-full">
    <div
      ref="containerYear"
      class="h-40 w-full p-4 overflow-hidden overflow-y-auto"
    >
      <div
        v-for="(obj, i) in itemsYear"
        :id="`option-year-${obj.value}`"
        :key="i"
        :class="selectedYearClass(obj)"
        @click="onSelectYear(obj)"
      >
        {{ obj.text }}
      </div>
    </div>
  </div>

  <div v-else-if="selectType === 'month'" class="w-full">
    <div class="px-3 pt-3 pb-1.5 flex justify-between items-center">
      <BaseButtonIcon size="sm" @click="onPrevItemsMonth()">
        <Icon name="ph:caret-left-bold"></Icon>
      </BaseButtonIcon>
      <div
        class="text-dark dark:text-white font-semibold cursor-pointer"
        @click="selectType = 'year'"
      >
        {{ selectedYear }}
      </div>
      <BaseButtonIcon size="sm" @click="onNextItemsMonth()">
        <Icon name="ph:caret-right-bold"></Icon>
      </BaseButtonIcon>
    </div>

    <div
      ref="containerMonth"
      class="h-40 w-full px-4 pb-4 overflow-hidden overflow-y-auto"
    >
      <div
        v-for="(obj, i) in itemsMonth"
        :id="`option-month-${obj.value}`"
        :key="i"
        :class="selectedMonthClass(obj)"
        @click="onSelectMonth(obj)"
      >
        {{ obj.text }}
      </div>
    </div>
  </div>

  <div v-else-if="selectType === 'date'" class="w-full">
    <div class="px-3 pt-3 pb-1.5 flex justify-between items-center">
      <BaseButtonIcon size="sm" @click="onPrevItemsDate()">
        <Icon name="ph:caret-left-bold"></Icon>
      </BaseButtonIcon>
      <div
        class="text-dark dark:text-white font-semibold cursor-pointer"
        @click="selectType = 'month'"
      >
        {{ selectedMonthText }}
      </div>
      <BaseButtonIcon size="sm" @click="onNextItemsDate()">
        <Icon name="ph:caret-right-bold"></Icon>
      </BaseButtonIcon>
    </div>

    <div class="px-3 grid grid-cols-7">
      <span
        v-for="(day, i) in itemsWeekDay"
        :key="i"
        class="h-9 aspect-square flex justify-center items-center text-xs text-slate-400 dark:text-slate-500 uppercase"
      >
        {{ day }}
      </span>
    </div>

    <div class="px-3 pb-3 grid grid-cols-7">
      <span
        v-for="(obj, i) in itemsDatePreviousMonthOffset"
        :key="i"
        class="h-9 aspect-square flex justify-center items-center text-sm text-slate-400 dark:text-slate-500 uppercase"
      >
        {{ obj.text }}
      </span>
      <span
        v-for="(obj, i) in itemsDate"
        :key="i"
        :class="selectedDateClass(obj)"
        @click="onSelectDate(obj)"
      >
        {{ obj.text }}
      </span>
      <span
        v-for="(obj, i) in itemsDateNextMonthOffset"
        :key="i"
        class="h-9 aspect-square flex justify-center items-center text-sm text-slate-400 dark:text-slate-500 uppercase"
      >
        {{ obj.text }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any;
  startDate?: string | null;
  endDate?: string | null;
}

const emits = defineEmits(['update:modelValue', 'onSelect']);
const props = withDefaults(defineProps<Props>(), {});

const { dayjs, timezone } = useNuxtApp();

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emits('update:modelValue', value);
  },
});

const selectType = ref('date');

watch(selectType, (value: string) => {
  if (value === 'year') {
    onScrollToSelectedYear();
  } else if (value === 'month') {
    onScrollToSelectedMonth();
  }
});

const currentDate = ref(dayjs.tz().tz(timezone).format('YYYY-MM-DD'));

const selectedDate = computed(() => {
  return inputModel.value || currentDate.value;
});

const selectedYear = ref();

watch(selectedYear, () => {
  onScrollToSelectedMonth();
});

const selectedMonth = ref();
const selectedMonthText = computed(() => {
  const year = selectedMonth.value?.split('-')[0];
  const month = selectedMonth.value?.split('-')[1];
  return dayjs
    .tz()
    .set('year', +year)
    .set('month', +month - 1)
    .format('MMMM YYYY');
});

const setSelectedItem = () => {
  selectedYear.value = dayjs.tz(selectedDate.value).format('YYYY');
  selectedMonth.value = dayjs.tz(selectedDate.value).format('YYYY-MM');
};

// Year
const containerYear = ref();
const onScrollToSelectedYear = () => {
  setTimeout(() => {
    const elOption: any = document.getElementById(
      `option-year-${selectedYear.value}`,
    );

    containerYear.value?.scrollTo({
      top: elOption ? elOption?.offsetTop - 100 : 0,
      behavior: 'smooth',
    });
  }, 100);
};

const selectedYearClass = (obj: any) => {
  const baseClass: any[] = [];

  baseClass.push('h-9 w-full text-sm rounded-lg');
  baseClass.push('flex justify-center items-center');

  if (selectedYear.value === obj.value) {
    baseClass.push('bg-primary-50 text-primary');
    baseClass.push('dark:bg-primary-950');
    baseClass.push('dark:text-primary-500');
  } else {
    baseClass.push('text-dark cursor-pointer');
    baseClass.push('hover:bg-slate-100 hover:bg-opacity-40');
    baseClass.push('dark:text-white');
    baseClass.push('dark:hover:bg-slate-800');
    baseClass.push('dark:hover:bg-opacity-50');
  }

  return baseClass.join(' ');
};

const onSelectYear = (obj: any) => {
  selectType.value = 'month';
  selectedYear.value = obj.value;
};

const itemsYear = computed(() => {
  const start = +dayjs.tz().tz(timezone).format('YYYY') - 70;
  const end = +dayjs.tz().tz(timezone).format('YYYY') + 5;
  const arr: any[] = [];
  for (let year = start; year <= end; year++) {
    arr.push({
      text: dayjs.tz().set('year', year).format('YYYY'),
      value: dayjs.tz().set('year', year).format('YYYY'),
    });
  }
  return arr;
});

// Month
const containerMonth = ref();
const onScrollToSelectedMonth = () => {
  setTimeout(() => {
    const elOption: any = document.getElementById(
      `option-month-${selectedMonth.value}`,
    );

    containerMonth.value?.scrollTo({
      top: elOption ? elOption?.offsetTop - 100 : 0,
      behavior: 'smooth',
    });
  }, 100);
};

const selectedMonthClass = (obj: any) => {
  const baseClass: any[] = [];

  baseClass.push('h-9 w-full text-sm rounded-lg');
  baseClass.push('flex justify-center items-center');

  if (selectedMonth.value === obj.value) {
    baseClass.push('bg-primary-50 text-primary');
    baseClass.push('dark:bg-primary-950');
    baseClass.push('dark:text-primary-500');
  } else {
    baseClass.push('text-dark cursor-pointer');
    baseClass.push('hover:bg-slate-100 hover:bg-opacity-40');
    baseClass.push('dark:text-white');
    baseClass.push('dark:hover:bg-slate-800');
    baseClass.push('dark:hover:bg-opacity-50');
  }

  return baseClass.join(' ');
};

const onSelectMonth = (obj: any) => {
  selectType.value = 'date';
  selectedMonth.value = obj.value;
};

const itemsMonth = computed(() => {
  const start = 1;
  const end = 12;
  const arr: any[] = [];
  for (let month = start; month <= end; month++) {
    arr.push({
      text: dayjs
        .tz()
        .set('month', month - 1)
        .format('MMMM'),
      value: dayjs
        .tz()
        .set('year', +selectedYear.value)
        .set('month', month - 1)
        .format('YYYY-MM'),
    });
  }
  return arr;
});

const onPrevItemsMonth = () => {
  const prevYear = dayjs
    .tz()
    .tz(timezone)
    .set('year', +selectedYear.value)
    .subtract(1, 'year');

  if (validateNotInStartEndDate(prevYear.format('YYYY-MM-DD'))) {
    return;
  }

  selectedYear.value = prevYear.format('YYYY');
};

const onNextItemsMonth = () => {
  const nextYear = dayjs
    .tz()
    .tz(timezone)
    .set('year', +selectedYear.value)
    .add(1, 'year');

  if (validateNotInStartEndDate(nextYear.format('YYYY-MM-DD'))) {
    return;
  }

  selectedYear.value = nextYear.format('YYYY');
};

// Week day
const itemsWeekDay = computed(() => {
  const start = 0;
  const end = 6;
  const arr: any[] = [];
  for (let i = start; i <= end; i++) {
    arr.push(
      dayjs.tz().tz(timezone).startOf('week').add(i, 'day').format('ddd'),
    );
  }
  return arr;
});

// Date
const validateNotInStartEndDate = (date: string) => {
  const isIsBeforeStartDate =
    props.startDate &&
    dayjs
      .tz(date)
      .tz(timezone)
      .isBefore(dayjs.tz(props.startDate).tz(timezone));

  const isIsAfterEndDate =
    props.endDate &&
    dayjs.tz(date).tz(timezone).isAfter(dayjs.tz(props.endDate).tz(timezone));

  return isIsBeforeStartDate || isIsAfterEndDate;
};

const selectedDateClass = (obj: any) => {
  const baseClass: any[] = [];

  baseClass.push('h-9 aspect-square text-sm rounded-full');
  baseClass.push('flex justify-center items-center duration-300');

  if (validateNotInStartEndDate(obj.value)) {
    baseClass.push('text-slate-400 cursor-not-allowed');
    baseClass.push('dark:text-slate-500');
  }

  if (selectedDate.value === obj.value) {
    baseClass.push('bg-primary-50 text-primary');
    baseClass.push('dark:bg-primary-950');
    baseClass.push('dark:text-primary-500');
  } else {
    if (validateNotInStartEndDate(obj.value)) {
      baseClass.push('text-slate-400 cursor-not-allowed');
      baseClass.push('dark:text-slate-500');
    } else {
      baseClass.push('text-dark cursor-pointer');
      baseClass.push('hover:bg-slate-100 hover:bg-opacity-40');
      baseClass.push('hover:bg-opacity-50');
      baseClass.push('dark:text-white');
      baseClass.push('dark:hover:bg-slate-800');
      baseClass.push('dark:hover:bg-opacity-50');
    }
  }

  return baseClass.join(' ');
};

const onSelectDate = (obj: any) => {
  if (validateNotInStartEndDate(obj.value)) {
    return;
  }

  inputModel.value = obj.value;
  emits('onSelect');
};

const itemsDatePreviousMonthOffset = computed(() => {
  const year = selectedMonth.value?.split('-')[0];
  const month = selectedMonth.value?.split('-')[1];
  const offset = +dayjs
    .tz()
    .tz(timezone)
    .set('year', +year)
    .set('month', +month - 1)
    .startOf('month')
    .format('d');
  const start = dayjs
    .tz()
    .tz(timezone)
    .set('year', +year)
    .set('month', +month - 1)
    .startOf('month')
    .subtract(1, 'day')
    .toDate();
  const end = dayjs
    .tz()
    .tz(timezone)
    .set('year', +year)
    .set('month', +month - 1)
    .startOf('month')
    .subtract(offset, 'day')
    .toDate();
  const arr: any[] = [];
  for (
    let d = start;
    d >= end;
    d = dayjs.tz(d.toISOString()).tz(timezone).subtract(1, 'day').toDate()
  ) {
    arr.unshift({
      text: dayjs.tz(d.toISOString()).tz(timezone).format('D'),
      value: dayjs.tz(d.toISOString()).tz(timezone).format('YYYY-MM-DD'),
    });
  }
  return arr;
});

const itemsDateNextMonthOffset = computed(() => {
  const year = selectedMonth.value?.split('-')[0];
  const month = selectedMonth.value?.split('-')[1];
  const offset =
    6 -
    +dayjs
      .tz()
      .tz(timezone)
      .set('year', +year)
      .set('month', +month - 1)
      .endOf('month')
      .format('d');

  const start = dayjs
    .tz()
    .tz(timezone)
    .set('year', +year)
    .set('month', +month - 1)
    .endOf('month')
    .add(1, 'day')
    .toDate();
  const end = dayjs
    .tz()
    .tz(timezone)
    .set('year', +year)
    .set('month', +month - 1)
    .endOf('month')
    .add(offset, 'day')
    .toDate();

  const arr: any[] = [];
  for (
    let d = start;
    d <= end;
    d = dayjs.tz(d.toISOString()).tz(timezone).add(1, 'day').toDate()
  ) {
    arr.push({
      text: dayjs.tz(d.toISOString()).tz(timezone).format('D'),
      value: dayjs.tz(d.toISOString()).tz(timezone).format('YYYY-MM-DD'),
    });
  }
  return arr;
});

const itemsDate = computed(() => {
  const year = selectedMonth.value?.split('-')[0];
  const month = selectedMonth.value?.split('-')[1];
  const start = dayjs
    .tz()
    .tz(timezone)
    .set('year', +year)
    .set('month', +month - 1)
    .startOf('month')
    .toDate();
  const end = dayjs
    .tz()
    .tz(timezone)
    .set('year', +year)
    .set('month', +month - 1)
    .endOf('month')
    .toDate();
  const arr: any[] = [];
  for (
    let d = start;
    d <= end;
    d = dayjs.tz(d.toDateString()).add(1, 'day').toDate()
  ) {
    arr.push({
      text: dayjs.tz(d.toISOString()).tz(timezone).format('D'),
      value: dayjs.tz(d.toISOString()).tz(timezone).format('YYYY-MM-DD'),
    });
  }
  return arr;
});

const onPrevItemsDate = () => {
  const year = selectedMonth.value?.split('-')[0];
  const month = selectedMonth.value?.split('-')[1];
  selectedMonth.value = dayjs
    .tz()
    .tz(timezone)
    .set('year', +year)
    .set('month', +month - 1)
    .subtract(1, 'month')
    .format('YYYY-MM');
};

const onNextItemsDate = () => {
  const year = selectedMonth.value?.split('-')[0];
  const month = selectedMonth.value?.split('-')[1];
  selectedMonth.value = dayjs
    .tz()
    .tz(timezone)
    .set('year', +year)
    .set('month', +month - 1)
    .add(1, 'month')
    .format('YYYY-MM');
};

onMounted(() => {
  setSelectedItem();
});
</script>
