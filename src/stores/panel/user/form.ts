import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelUserFormStore = defineStore('panelUserFormStore', () => {
  const { axios, i18n } = useNuxtApp();

  const toastStore = useToastStore();

  const getUserId = () => {
    const route = useRoute();
    return route.params.user_id;
  };

  const isEditing = () => {
    return isNotEmpty(getUserId());
  };

  const inputForm = reactive({
    name: null as any,
    email: null as any,
    password: null as any,
    role: null as any,
    supervisor_locations: [] as any[],
    supervisor_job_positions: [] as any[],
    is_active: true,
  });
  const inputFormDefault = useCloned(inputForm).cloned.value;

  const onResetForm = () => {
    errorForm.value = {};
    objectAssignTarget(inputForm, inputFormDefault);
  };

  const errorForm = ref({} as any);
  const onValidateForm = () => {
    errorForm.value = onValidateInput(inputForm, {
      name: ['is_not_empty'],
      email: ['is_not_empty', 'is_email'],
      password: isEditing() ? [] : ['is_not_empty'],
      role: ['is_not_empty'],
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
      res = await axios.put(`v1/users/${getUserId()}`, inputForm);
    } else {
      res = await axios.post('v1/users', inputForm);
    }

    if (res.statusCode === 200) {
      toastStore.open({
        color: 'success',
        message: i18n.t('message.success_updated'),
      });
      onFetchItemUser();
    } else if (res.statusCode === 201) {
      toastStore.open({
        color: 'success',
        message: i18n.t('message.success_added'),
      });
      navigateTo('/panel/user');
    } else {
      toastStore.open({
        color: 'danger',
        message: getErrorMessage(res),
      });
    }

    loadingSubmitForm.value = false;
  };

  const itemUser = ref();
  const loadingItemUser = ref(false);
  const onFetchItemUser = async () => {
    loadingItemUser.value = true;

    const res: any = await axios.get(`v1/users/${getUserId()}`);

    if (res.statusCode === 200) {
      itemUser.value = res.data;

      objectAssignTarget(inputForm, res.data);
    } else {
      toastStore.open({
        color: 'danger',
        message: getErrorMessage(res),
      });
    }

    loadingItemUser.value = false;
  };

  return {
    inputForm,
    errorForm,
    itemUser,
    loadingSubmitForm,
    loadingItemUser,
    isEditing,
    onResetForm,
    onSubmitForm,
    onFetchItemUser,
  };
});
