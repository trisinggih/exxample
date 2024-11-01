import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelShiftFormStore = defineStore('panelShiftFormStore', () => {
  const { axios, i18n } = useNuxtApp();

  const toastStore = useToastStore();

  const getShiftId = () => {
    const route = useRoute();
    return route.params.shift_id;
  };

  const isEditing = () => {
    return isNotEmpty(getShiftId());
  };

  const inputFormDefault = {
    name: null as any,
    start_time: null as any,
    end_time: null as any,
  };
  const inputForm = reactive(useCloned(inputFormDefault).cloned.value);

  const onResetForm = () => {
    errorForm.value = {};
    objectAssignTarget(inputForm, inputFormDefault);
  };

  const errorForm = ref({} as any);
  const onValidateForm = () => {
    errorForm.value = onValidateInput(inputForm, {
      name: ['is_not_empty'],
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
      res = await axios.put(`v1/shifts/${getShiftId()}`, inputForm);
    } else {
      res = await axios.post('v1/shifts', inputForm);
    }

    if (res.statusCode === 200) {
      toastStore.open({
        color: 'success',
        message: i18n.t('message.success_updated'),
      });
      onFetchItemShift();
    } else if (res.statusCode === 201) {
      toastStore.open({
        color: 'success',
        message: i18n.t('message.success_added'),
      });
      navigateTo('/panel/shift');
    } else {
      toastStore.open({
        color: 'danger',
        message: getErrorMessage(res),
      });
    }

    loadingSubmitForm.value = false;
  };

  const itemShift = ref();
  const loadingItemShift = ref(false);
  const onFetchItemShift = async () => {
    loadingItemShift.value = true;

    const res: any = await axios.get(`v1/shifts/${getShiftId()}`);

    if (res.statusCode === 200) {
      itemShift.value = res.data;

      objectAssignTarget(inputForm, res.data);
    } else {
      toastStore.open({
        color: 'danger',
        message: getErrorMessage(res),
      });
    }

    loadingItemShift.value = false;
  };

  return {
    inputForm,
    errorForm,
    itemShift,
    loadingSubmitForm,
    loadingItemShift,
    isEditing,
    onResetForm,
    onSubmitForm,
    onFetchItemShift,
  };
});
