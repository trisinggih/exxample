import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelEmployeeLocationFormStore = defineStore(
  'panelEmployeeLocationFormStore',
  () => {
    const { axios, i18n } = useNuxtApp();

    const toastStore = useToastStore();

    const panelEmployeeLocationListStore = usePanelEmployeeLocationListStore();

    const isModalOpenForm = ref(false);
    const employeeLocationId = ref(null as any);

    const isEditing = () => {
      return isNotEmpty(employeeLocationId.value);
    };

    const inputForm = reactive({
      employee: null as any,
      locations: [] as any[],
    });
    const inputFormDefault = useCloned(inputForm).cloned.value;

    const onResetForm = () => {
      employeeLocationId.value = null;
      errorForm.value = {};
      inputFormDefault.locations = [];
      objectAssignTarget(inputForm, inputFormDefault);
    };

    const errorForm = ref({} as any);
    const onValidateForm = () => {
      errorForm.value = onValidateInput(inputForm, {
        employee: ['is_not_empty'],
        locations: ['is_not_empty'],
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
          `v1/employee-locations/${employeeLocationId.value}`,
          inputForm,
        );
      } else {
        res = await axios.post('v1/employee-locations', inputForm);
      }

      if (res.statusCode === 200) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_updated'),
        });
        panelEmployeeLocationListStore.onFetchItemsEmployeeLocation(true);
        isModalOpenForm.value = false;
      } else if (res.statusCode === 201) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_added'),
        });
        panelEmployeeLocationListStore.onFetchItemsEmployeeLocation(true);
        isModalOpenForm.value = false;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitForm.value = false;
    };

    const itemEmployeeLocation = ref();
    const loadingItemEmployeeLocation = ref(false);
    const onFetchItemEmployeeLocation = async () => {
      loadingItemEmployeeLocation.value = true;

      const res: any = await axios.get(
        `v1/employee-locations/${employeeLocationId.value}`,
      );

      if (res.statusCode === 200) {
        itemEmployeeLocation.value = res.data;

        objectAssignTarget(inputForm, res.data);
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemEmployeeLocation.value = false;
    };

    return {
      isModalOpenForm,
      employeeLocationId,
      inputForm,
      errorForm,
      itemEmployeeLocation,
      loadingSubmitForm,
      loadingItemEmployeeLocation,
      isEditing,
      onResetForm,
      onSubmitForm,
      onFetchItemEmployeeLocation,
    };
  },
);
