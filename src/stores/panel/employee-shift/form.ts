import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelEmployeeShiftFormStore = defineStore(
  'panelEmployeeShiftFormStore',
  () => {
    const { axios, i18n, dayjs } = useNuxtApp();

    const toastStore = useToastStore();
    const selectionStore = useSelectionStore();
    const panelEmployeeShiftListStore = usePanelEmployeeShiftListStore();

    const isModalOpenForm = ref(false);
    const employeeShiftId = ref(null as any);

    const isEditing = () => {
      return isNotEmpty(employeeShiftId.value);
    };

    const inputFormDefault = {
      employee: null as any,
      shift: null as any,
      date: null as any,
      start_time: null as any,
      end_time: null as any,
    };
    const inputForm = reactive(useCloned(inputFormDefault).cloned.value);

    const isInputFormSelectShift = computed(() => {
      return isNotEmpty(inputForm.shift);
    });

    const inputFormShift = computed(() => inputForm.shift);
    watch(inputFormShift, (value: any) => {
      if (value) {
        const objShift = selectionStore.getSelectable(
          'SHIFT',
          inputFormShift.value,
        );

        inputForm.start_time = objShift?.start_time;
        inputForm.end_time = objShift?.end_time;
      }
    });

    const onResetForm = () => {
      employeeShiftId.value = null;
      errorForm.value = {};
      objectAssignTarget(inputForm, inputFormDefault);
    };

    const errorForm = ref({} as any);
    const onValidateForm = () => {
      errorForm.value = onValidateInput(inputForm, {
        date: ['is_not_empty'],
        start_time: ['is_not_empty'],
        end_time: ['is_not_empty'],
      });
      return isNotEmptyObject(errorForm.value);
    };

    const loadingSubmitForm = ref(false);
    const onSubmitForm = async () => {
      if (onValidateForm()) return;
      if (loadingSubmitForm.value) return;

      loadingSubmitForm.value = true;

      let res: any;
      if (isEditing()) {
        res = await axios.put(
          `v1/employee-shifts/${employeeShiftId.value}`,
          inputForm,
        );
      } else {
        res = await axios.post('v1/employee-shifts', inputForm);
      }

      if (res.statusCode === 200) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_updated'),
        });
        panelEmployeeShiftListStore.onFetchItemsEmployeeShift(true);
        isModalOpenForm.value = false;
      } else if (res.statusCode === 201) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_added'),
        });
        panelEmployeeShiftListStore.onFetchItemsEmployeeShift(true);
        isModalOpenForm.value = false;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitForm.value = false;
    };

    const itemEmployeeShift = ref();
    const loadingItemEmployeeShift = ref(false);
    const onFetchItemEmployeeShift = async () => {
      loadingItemEmployeeShift.value = true;

      const res: any = await axios.get(
        `v1/employee-shifts/${employeeShiftId.value}`,
      );

      if (res.statusCode === 200) {
        itemEmployeeShift.value = res.data;

        objectAssignTarget(inputForm, {
          ...res.data,
          start_time: res.data.start_at
            ? dayjs
                .tz(res.data.start_at)
                .tz(res.data.timezone)
                .format('HH:mm:ss')
            : null,
          end_time: res.data.end_at
            ? dayjs.tz(res.data.end_at).tz(res.data.timezone).format('HH:mm:ss')
            : null,
        });
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemEmployeeShift.value = false;
    };

    return {
      isModalOpenForm,
      employeeShiftId,
      inputForm,
      errorForm,
      itemEmployeeShift,
      loadingSubmitForm,
      loadingItemEmployeeShift,
      isInputFormSelectShift,
      isEditing,
      onResetForm,
      onSubmitForm,
      onFetchItemEmployeeShift,
    };
  },
);
