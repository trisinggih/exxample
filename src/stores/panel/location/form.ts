import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelLocationFormStore = defineStore(
  'panelLocationFormStore',
  () => {
    const { axios, i18n } = useNuxtApp();

    const toastStore = useToastStore();

    const getLocationId = () => {
      const route = useRoute();
      return route.params.location_id;
    };

    const isEditing = () => {
      return isNotEmpty(getLocationId());
    };

    const inputFormDefault = {
      name: null as any,
      address: null as any,
      photos: [] as any[],
      token: null as any,
      max_scan_daily_shift: null as any,
      max_scan_daily_overtime: null as any,
      is_must_scan_in_shift: null as any,
      is_must_scan_in_overtime: null as any,
      scan_type: null as any,
      is_active: true,
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
        address: ['is_not_empty'],
        token: ['is_not_empty'],
        scan_type: ['is_not_empty'],
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
        res = await axios.put(`v1/locations/${getLocationId()}`, {
          ...inputForm,
          max_scan_daily_shift: inputForm.max_scan_daily_shift
            ? +inputForm.max_scan_daily_shift
            : null,
        });
      } else {
        res = await axios.post('v1/locations', {
          ...inputForm,
          max_scan_daily_shift: inputForm.max_scan_daily_shift
            ? +inputForm.max_scan_daily_shift
            : null,
        });
      }

      if (res.statusCode === 200) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_updated'),
        });
        onFetchItemLocation();
      } else if (res.statusCode === 201) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_added'),
        });
        navigateTo('/panel/location');
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitForm.value = false;
    };

    const itemLocation = ref();
    const loadingItemLocation = ref(false);
    const onFetchItemLocation = async () => {
      loadingItemLocation.value = true;

      const res: any = await axios.get(`v1/locations/${getLocationId()}`);

      if (res.statusCode === 200) {
        itemLocation.value = res.data;

        objectAssignTarget(inputForm, res.data);
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemLocation.value = false;
    };

    return {
      inputForm,
      errorForm,
      itemLocation,
      loadingSubmitForm,
      loadingItemLocation,
      isEditing,
      onResetForm,
      onSubmitForm,
      onFetchItemLocation,
    };
  },
);
