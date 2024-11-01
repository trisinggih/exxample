import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelEmployeeFormStore = defineStore(
  'panelEmployeeFormStore',
  () => {
    const { axios, i18n } = useNuxtApp();

    const toastStore = useToastStore();

    const getEmployeeId = () => {
      const route = useRoute();
      return route.params.employee_id;
    };

    const isEditing = () => {
      return isNotEmpty(getEmployeeId());
    };

    const inputForm = reactive({
      employee_identity_number: null as any,
      full_name: null as any,
      gender: null as any,
      phone: null as any,
      picture: null as any,
      file_picture: null as any,
      address: null as any,
      branch: null as any,
      department: null as any,
      job_position: null as any,
      job_level: null as any,
      join_date: null as any,
      end_date: null as any,
      sign_date: null as any,
      resign_date: null as any,
      employee_status: null as any,
      tax_status: null as any,
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
        employee_identity_number: ['is_not_empty'],
        full_name: ['is_not_empty'],
        gender: ['is_optional'],
        phone: ['is_not_empty', 'is_phone_number'],
        picture: ['is_optional'],
        address: ['is_optional'],
        branch: ['is_not_empty'],
        department: ['is_not_empty'],
        job_position: ['is_not_empty'],
        job_level: ['is_not_empty'],
        join_date: ['is_not_empty'],
        end_date: ['is_optional'],
        sign_date: ['is_optional'],
        resign_date: ['is_optional'],
        employee_status: ['is_not_empty'],
        tax_status: ['is_not_empty'],
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
          `v1/employees/${getEmployeeId()}`,
          objectToFormData(inputForm),
        );
      } else {
        res = await axios.post('v1/employees', objectToFormData(inputForm));
      }

      if (res.statusCode === 200) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_updated'),
        });
        onFetchItemEmployee();
      } else if (res.statusCode === 201) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_added'),
        });
        navigateTo('/panel/employee');
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitForm.value = false;
    };

    const itemEmployee = ref();
    const loadingItemEmployee = ref(false);
    const onFetchItemEmployee = async () => {
      loadingItemEmployee.value = true;

      const res: any = await axios.get(`v1/employees/${getEmployeeId()}`);

      if (res.statusCode === 200) {
        itemEmployee.value = res.data;

        objectAssignTarget(inputForm, res.data);
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemEmployee.value = false;
    };

    return {
      inputForm,
      errorForm,
      itemEmployee,
      loadingSubmitForm,
      loadingItemEmployee,
      isEditing,
      onResetForm,
      onSubmitForm,
      onFetchItemEmployee,
    };
  },
);
