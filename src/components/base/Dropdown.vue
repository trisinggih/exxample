<template>
  <div ref="dropdown" class="relative">
    <slot
      name="activator"
      :is-open="isDropdownOpen"
      :on-open="onOpen"
      :on-close="onClose"
    ></slot>

    <Transition
      enter-active-class="duration-300 ease-in"
      :enter-from-class="transitionClass.join(' ')"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-300 ease-out absolute"
      leave-from-class="opacity-100 translate-y-0"
      :leave-to-class="transitionClass.join(' ')"
      move-class="duration-300"
    >
      <div v-if="isDropdownOpen" ref="dropdownContent" :class="dropdownClass">
        <slot
          :is-open="isDropdownOpen"
          :on-open="onOpen"
          :on-close="onClose"
        ></slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  classes?: {
    dropdown?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {});

const isDropdownOpen = ref(false);
const dropdown = ref();
const dropdownContent = ref();

onClickOutside(dropdown, () => {
  isDropdownOpen.value = false;
  removeScrollListener();
});

const onOpen = () => {
  isDropdownOpen.value = true;
  adjustDropdownPosition();
  addScrollListener();
};

const onClose = () => {
  isDropdownOpen.value = false;
  removeScrollListener();
};

const transitionClass = ref([] as string[]);

const positionClass = ref([] as string[]);
const adjustDropdownPosition = () => {
  positionClass.value = [];
  transitionClass.value = ['transform opacity-0'];

  nextTick(() => {
    if (dropdownContent.value) {
      const rect = dropdown.value.getBoundingClientRect();
      const rectContent = dropdownContent.value.getBoundingClientRect();

      // Horizontal adjustment
      if (rectContent.right > window.innerWidth) {
        positionClass.value.push('right-0');
      } else {
        positionClass.value.push('left-0');
      }

      // Vertical adjustment
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      if (
        spaceBelow < dropdownContent.value.offsetHeight &&
        spaceAbove > dropdownContent.value.offsetHeight
      ) {
        positionClass.value.push('bottom-full mb-1');
        transitionClass.value.push('translate-y-5');
      } else {
        positionClass.value.push('top-full mt-1');
        transitionClass.value.push('-translate-y-5');
      }
    }
  });
};

const timeoutScroll = ref();
const handleScroll = () => {
  clearTimeout(timeoutScroll.value);
  setTimeout(() => {
    adjustDropdownPosition();
  }, 500);
};

const addScrollListener = () => {
  window.addEventListener('scroll', handleScroll);
};

const removeScrollListener = () => {
  window.removeEventListener('scroll', handleScroll);
};

const dropdownClass = computed(() => {
  const baseClass: string[] = [];

  baseClass.push('absolute rounded-xl shadow-card');
  baseClass.push('bg-white bg-opacity-80 backdrop-blur-sm');
  baseClass.push('z-[10]');
  baseClass.push(...positionClass.value);

  if (props.classes?.dropdown) {
    baseClass.push(props.classes.dropdown);
  }

  return baseClass.join(' ');
});
</script>
