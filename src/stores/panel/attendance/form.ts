import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelAttendanceFormStore = defineStore(
  'panelAttendanceFormStore',
  () => {
    const { axios, i18n, dayjs } = useNuxtApp();

    const toastStore = useToastStore();

    const panelAttendanceListStore = usePanelAttendanceListStore();

    const isModalOpenForm = ref(false);
    const attendanceId = ref(null as any);

    const isEditing = () => {
      return isNotEmpty(attendanceId.value);
    };

    const inputForm = reactive({
      employee: null as any,
      date: null as any,
      start_time: null as any,
      end_time: null as any,
      note: null as any,
      status: null as any,
    });
    const inputFormDefault = useCloned(inputForm).cloned.value;

    const onResetForm = () => {
      attendanceId.value = null;
      errorForm.value = {};
      objectAssignTarget(inputForm, inputFormDefault);
    };

    const errorForm = ref({} as any);
    const onValidateForm = () => {
      errorForm.value = onValidateInput(inputForm, {
        employee: ['is_not_empty'],
        date: ['is_not_empty'],
        status: ['is_not_empty'],
        // start_time: inputForm.status === 'PRESENT' ? ['is_not_empty'] : [],
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
          `v1/attendances/${attendanceId.value}`,
          inputForm,
        );
      } else {
        res = await axios.post('v1/attendances', inputForm);
      }

      if (res.statusCode === 200) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_updated'),
        });
        panelAttendanceListStore.onFetchItemsAttendance(true);
        isModalOpenForm.value = false;
      } else if (res.statusCode === 201) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_added'),
        });
        panelAttendanceListStore.onFetchItemsAttendance(true);
        isModalOpenForm.value = false;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitForm.value = false;
    };

    const itemAttendance = ref();
    const loadingItemAttendance = ref(false);
    const onFetchItemAttendance = async () => {
      loadingItemAttendance.value = true;

      const res: any = await axios.get(`v1/attendances/${attendanceId.value}`);

      if (res.statusCode === 200) {
        itemAttendance.value = res.data;

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

      loadingItemAttendance.value = false;
    };

    return {
      isModalOpenForm,
      attendanceId,
      inputForm,
      errorForm,
      itemAttendance,
      loadingSubmitForm,
      loadingItemAttendance,
      isEditing,
      onResetForm,
      onSubmitForm,
      onFetchItemAttendance,
    };
  },
);
