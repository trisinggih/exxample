import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelOvertimeFormStore = defineStore(
  'panelOvertimeFormStore',
  () => {
    const { axios, i18n, dayjs } = useNuxtApp();

    const toastStore = useToastStore();

    const panelOvertimeListStore = usePanelOvertimeListStore();

    const isModalOpenForm = ref(false);
    const overtimeId = ref(null as any);

    const isEditing = () => {
      return isNotEmpty(overtimeId.value);
    };

    const inputForm = reactive({
      employee: null as any,
      date: null as any,
      start_time: null as any,
      end_time: null as any,
    });
    const inputFormDefault = useCloned(inputForm).cloned.value;

    const onResetForm = () => {
      overtimeId.value = null;
      errorForm.value = {};
      objectAssignTarget(inputForm, inputFormDefault);
    };

    const errorForm = ref({} as any);
    const onValidateForm = () => {
      errorForm.value = onValidateInput(inputForm, {
        employee: ['is_not_empty'],
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
        res = await axios.put(`v1/overtimes/${overtimeId.value}`, inputForm);
      } else {
        res = await axios.post('v1/overtimes', inputForm);
      }

      if (res.statusCode === 200) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_updated'),
        });
        panelOvertimeListStore.onFetchItemsOvertime(true);
        isModalOpenForm.value = false;
      } else if (res.statusCode === 201) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_added'),
        });
        panelOvertimeListStore.onFetchItemsOvertime(true);
        isModalOpenForm.value = false;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitForm.value = false;
    };

    const itemOvertime = ref();
    const loadingItemOvertime = ref(false);
    const onFetchItemOvertime = async () => {
      loadingItemOvertime.value = true;

      const res: any = await axios.get(`v1/overtimes/${overtimeId.value}`);

      if (res.statusCode === 200) {
        itemOvertime.value = res.data;

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

      loadingItemOvertime.value = false;
    };

    return {
      isModalOpenForm,
      overtimeId,
      inputForm,
      errorForm,
      itemOvertime,
      loadingSubmitForm,
      loadingItemOvertime,
      isEditing,
      onResetForm,
      onSubmitForm,
      onFetchItemOvertime,
    };
  },
);
