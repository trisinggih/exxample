<template>
  <teleport v-if="isMounted" to="#modal">
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="isShowOverlay"
        class="fixed h-full w-full bg-black bg-opacity-50 overflow-y-auto flex justify-center z-[999]"
        @click.self="onCloseModal()"
      >
        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0 scale-90"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
        >
          <BaseCard v-if="isShowModal" rounded="lg" :class="modalClass">
            <BaseCardHead :title="props.title">
              <template #action>
                <BaseButtonIcon rounded="full" @click="onCloseModal()">
                  <Icon name="ph:x-bold"></Icon>
                </BaseButtonIcon>
              </template>
            </BaseCardHead>

            <slot></slot>
          </BaseCard>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: boolean;
  title?: string;
  classes?: {
    modal?: string;
  };
}

const emit = defineEmits(['update:modelValue']);
const props = defineProps<Props>();

const modalModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit('update:modelValue', value);
  },
});

const isShowModal = ref(false);
const isShowOverlay = computed(() => modalModel.value);

watch(isShowOverlay, (value: boolean) => {
  if (value) {
    nextTick(() => {
      isShowModal.value = true;
    });
  } else {
    isShowModal.value = false;
  }
});

const onCloseModal = () => {
  modalModel.value = false;
};

const modalClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('bg-white rounded-2xl px-5 pb-5 h-fit mt-10 duration-300');

  if (props.classes?.modal) {
    baseClass.push(props.classes.modal);
  } else {
    baseClass.push('w-11/12 sm:w-1/2 lg:w-1/3');
  }

  return baseClass.join(' ');
});

const isMounted = ref(false);
onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 500);
});
</script>
