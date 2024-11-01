<template>
  <div class="space-y-3">
    <div class="flex justify-between items-center gap-3">
      <BaseText size="sm" class="text-dark-400">
        Total data: {{ props.totalData }}
      </BaseText>

      <div class="flex items-center gap-2">
        <BaseText size="sm" class="text-dark-400"> Show: </BaseText>
        <BaseDropdown
          :classes="{ dropdown: 'w-full max-h-28 overflow-y-auto' }"
          class="w-24"
        >
          <template #activator="{ isOpen, onOpen, onClose }">
            <BaseInput
              :model-value="props.perPage"
              size="sm"
              readonly
              :classes="{
                inputPadding: 'pl-3 pr-10',
                inputCursor: 'cursor-pointer',
              }"
              @click="isOpen ? onClose() : onOpen()"
            >
              <template #suffix>
                <div
                  class="input-suffix-icon cursor-pointer"
                  @click="isOpen ? onClose() : onOpen()"
                >
                  <Icon
                    name="ph:caret-down-bold"
                    class="duration-300"
                    :class="{
                      'rotate-180': isOpen,
                    }"
                  ></Icon>
                </div>
              </template>
            </BaseInput>
          </template>
          <template #default="{ onClose }">
            <BaseListSelection
              v-model="inputPerPage"
              :items="itemsPerPage"
              @on-select="onClose()"
            ></BaseListSelection>
          </template>
        </BaseDropdown>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-3"
    >
      <div
        class="bg-primary-50 flex flex-wrap items-center p-1 gap-1 rounded-xl"
      >
        <div
          v-for="value in totalPage"
          :key="value"
          :class="pageClass(value)"
          @click="onPage(value)"
        >
          {{ value }}
        </div>

        <!-- <div
        v-if="!isFirstGroupPage"
        :class="pageClass(firstPage)"
        @click="onPage(firstPage)"
      >
        {{ firstPage }}
      </div>

      <div
        v-if="!isFirstGroupPage"
        class="size-10 grid place-items-center rounded-lg text-sm bg-white text-dark"
      >
        <Icon name="ph:dots-three" class="text-lg"></Icon>
      </div>

      <div
        v-for="value in itemsPage"
        :key="value"
        :class="pageClass(value)"
        @click="onPage(value)"
      >
        {{ value }}
      </div>

      <div
        v-if="!isLastGroupPage"
        class="size-10 grid place-items-center rounded-lg text-sm bg-white text-dark"
      >
        <Icon name="ph:dots-three" class="text-lg"></Icon>
      </div>

      <div
        v-if="!isLastGroupPage"
        :class="pageClass(lastPage)"
        @click="onPage(lastPage)"
      >
        {{ lastPage }}
      </div> -->
      </div>

      <div class="bg-primary-50 flex items-center p-1 gap-1 rounded-xl">
        <div
          class="h-10 w-full md:size-10 grid place-items-center rounded-lg text-sm bg-white text-dark border border-slate-300 hover:bg-slate-50 hover:border-slate-200 cursor-pointer duration-300"
          @click="onPrevious()"
        >
          <Icon name="ph:caret-left-bold"></Icon>
        </div>
        <div
          class="h-10 w-full md:size-10 grid place-items-center rounded-lg text-sm bg-white text-dark border border-slate-300 hover:bg-slate-50 hover:border-slate-200 cursor-pointer duration-300"
          @click="onNext()"
        >
          <Icon name="ph:caret-right-bold"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  page: number;
  perPage: number;
  totalData: number;
  totalVisible?: number;
}

const emit = defineEmits(['update:page', 'update:perPage']);
const props = withDefaults(defineProps<Props>(), {
  page: 1,
  perPage: 15,
  totalData: 1,
  totalVisible: 5,
});

const itemsPerPage = ref([
  {
    text: '10',
    value: 10,
  },
  {
    text: '25',
    value: 25,
  },
  {
    text: '50',
    value: 50,
  },
  {
    text: '100',
    value: 100,
  },
  {
    text: '1000',
    value: 1000,
  },
]);

const inputPerPage = computed({
  get() {
    return props.perPage;
  },
  set(value: any) {
    emit('update:page', 1);
    emit('update:perPage', value);
  },
});

const totalPage = computed(() => {
  return Math.ceil(props.totalData / props.perPage) || 1;
});

const firstPage = computed(() => {
  return 1;
});

const lastPage = computed(() => {
  return totalPage.value;
});

const isFirstGroupPage = computed(() => {
  return props.page < props.totalVisible;
});

const isLastGroupPage = computed(() => {
  return props.page > lastPage.value - props.totalVisible + 1;
});

const itemsPage = computed(() => {
  if (isFirstGroupPage.value) {
    return Array.from({ length: props.totalVisible }, (_, i: number) => i + 1);
  } else if (isLastGroupPage.value) {
    return Array.from(
      { length: props.totalVisible },
      (_, i: number) => i - props.totalVisible + lastPage.value + 1,
    );
  } else {
    return Array.from(
      { length: props.totalVisible },
      (_, i: number) => i - 2 + props.page,
    );
  }
});

const onPrevious = () => {
  if (props.page > 1) {
    emit('update:page', props.page - 1);
  }
};

const onNext = () => {
  if (props.page < totalPage.value) {
    emit('update:page', props.page + 1);
  }
};

const onPage = (value: number) => {
  emit('update:page', value);
};

const pageClass = (value: number) => {
  const baseClass: string[] = [];

  baseClass.push('size-10 grid place-items-center rounded-lg');
  baseClass.push('text-sm duration-300');

  if (props.page === value) {
    baseClass.push('bg-primary text-white');
  } else {
    baseClass.push('bg-white text-dark cursor-pointer');
    baseClass.push('border border-slate-300');
    baseClass.push('hover:bg-slate-50 hover:border-slate-200');
  }

  return baseClass.join(' ');
};
</script>
