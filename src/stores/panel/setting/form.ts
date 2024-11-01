import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelSettingFormStore = defineStore(
  'panelSettingFormStore',
  () => {
    const { axios, i18n } = useNuxtApp();

    const toastStore = useToastStore();

    const getSettingId = () => {
      const route = useRoute();
      return route.params.setting_id;
    };

    const isEditing = () => {
      return isNotEmpty(getSettingId());
    };

    const inputForm = reactive({
      key: null as any,
      value: null as any,
    });
    const inputFormDefault = useCloned(inputForm).cloned.value;

    const onResetForm = () => {
      errorForm.value = {};
      objectAssignTarget(inputForm, inputFormDefault);
    };

    const errorForm = ref({} as any);
    const onValidateForm = () => {
      errorForm.value = onValidateInput(inputForm, {
        key: ['is_not_empty'],
        value: ['is_not_empty'],
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
        res = await axios.put(`v1/settings/${getSettingId()}`, inputForm);
      } else {
        res = await axios.post('v1/settings', inputForm);
      }

      if (res.statusCode === 200) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_updated'),
        });
        onFetchItemSetting();
      } else if (res.statusCode === 201) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_added'),
        });
        navigateTo('/panel/setting');
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitForm.value = false;
    };

    const itemSetting = ref();
    const loadingItemSetting = ref(false);
    const onFetchItemSetting = async () => {
      loadingItemSetting.value = true;

      const res: any = await axios.get(`v1/settings/${getSettingId()}`);

      if (res.statusCode === 200) {
        itemSetting.value = res.data;

        objectAssignTarget(inputForm, res.data);
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemSetting.value = false;
    };

    return {
      inputForm,
      errorForm,
      itemSetting,
      loadingSubmitForm,
      loadingItemSetting,
      isEditing,
      onResetForm,
      onSubmitForm,
      onFetchItemSetting,
    };
  },
);
