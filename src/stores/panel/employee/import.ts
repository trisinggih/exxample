import { isNotEmptyObject } from 'class-validator';

export const usePanelEmployeeImportStore = defineStore(
  'panelEmployeeImportStore',
  () => {
    const { axios, i18n } = useNuxtApp();

    const toastStore = useToastStore();
    const selectionStore = useSelectionStore();
    const panelEmployeeListStore = usePanelEmployeeListStore();

    // Modal
    const isModalOpen = ref(false);
    const onOpenModal = () => {
      onResetForm();
      isModalOpen.value = true;
    };
    const onCloseModal = () => {
      onResetForm();
      isModalOpen.value = false;
    };
    //

    // Form
    const inputForm = reactive({
      file: null as any,
    });
    const inputFormDefault = useCloned(inputForm).cloned.value;

    const onResetForm = () => {
      errorForm.value = {};
      objectAssignTarget(inputForm, inputFormDefault);
    };

    const errorForm = ref({} as any);
    const onValidateForm = () => {
      errorForm.value = onValidateInput(inputForm, {
        file: ['is_not_empty'],
      });
      return isNotEmptyObject(errorForm.value);
    };

    const loadingSubmitForm = ref(false);
    const onSubmitForm = async () => {
      if (onValidateForm()) return;
      if (loadingSubmitForm.value) return;

      loadingSubmitForm.value = true;

      const res: any = await axios.post(
        'v1/employees/import',
        objectToFormData(inputForm),
      );

      if (res.statusCode === 201) {
        toastStore.open({
          color: 'success',
          message: i18n.t('message.success_updated'),
        });
        onCloseModal();
        panelEmployeeListStore.onResetPagination();
        panelEmployeeListStore.onResetFilter();
        panelEmployeeListStore.onResetSearch();
        panelEmployeeListStore.onFetchItemsEmployee();
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitForm.value = false;
    };
    //

    // Template
    const onDownloadTemplate = () => {
      const fileUrl = selectionStore.getSelectable(
        'PUBLIC_FILE',
        'IMPORT_TEMPLATE_EMPLOYEE',
      )?.file_url;

      if (fileUrl) {
        window.open(fileUrl);
      }
    };
    //

    return {
      isModalOpen,
      inputForm,
      errorForm,
      loadingSubmitForm,
      onResetForm,
      onSubmitForm,
      onOpenModal,
      onCloseModal,
      onDownloadTemplate,
    };
  },
);
