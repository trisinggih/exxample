import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelSelectionFormStore = defineStore(
  'panelSelectionFormStore',
  () => {
    const { axios, i18n } = useNuxtApp();

    const toastStore = useToastStore();

    const getSelectionId = () => {
      const route = useRoute();
      return route.params.selection_id;
    };

    const isEditing = () => {
      return isNotEmpty(getSelectionId());
    };

    const inputForm = reactive({
      type: null as any,
      text: null as any,
      color: null as any,
      icon: null as any,
    });
    const inputFormDefault = useCloned(inputForm).cloned.value;

    const onResetForm = () => {
      errorForm.value = {};
      objectAssignTarget(inputForm, inputFormDefault);
    };

    const errorForm = ref({} as any);
    const onValidateForm = () => {
      errorForm.value = onValidateInput(inputForm, {
        type: ['is_not_empty'],
        text: ['is_not_empty'],
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
        res = await axios.put(`v1/selections/${getSelectionId()}`, inputForm);
      } else {
        res = await axios.post('v1/selections', inputForm);
      }

      if (res.statusCode === 200) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_updated'),
        });
        onFetchItemSelection();
      } else if (res.statusCode === 201) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_added'),
        });
        navigateTo('/panel/selection');
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitForm.value = false;
    };

    const itemSelection = ref();
    const loadingItemSelection = ref(false);
    const onFetchItemSelection = async () => {
      loadingItemSelection.value = true;

      const res: any = await axios.get(`v1/selections/${getSelectionId()}`);

      if (res.statusCode === 200) {
        itemSelection.value = res.data;

        objectAssignTarget(inputForm, res.data);
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemSelection.value = false;
    };

    return {
      inputForm,
      errorForm,
      itemSelection,
      loadingSubmitForm,
      loadingItemSelection,
      isEditing,
      onResetForm,
      onSubmitForm,
      onFetchItemSelection,
    };
  },
);
