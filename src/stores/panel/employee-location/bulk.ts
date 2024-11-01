import { isNotEmptyObject } from 'class-validator';

export const usePanelEmployeeLocationBulkStore = defineStore(
  'panelEmployeeLocationBulkStore',
  () => {
    const { axios, i18n } = useNuxtApp();

    const toastStore = useToastStore();
    const dialogStore = useDialogStore();

    const selectionStore = useSelectionStore();
    const panelEmployeeLocationListStore = usePanelEmployeeLocationListStore();

    // Checklist
    const itemsChecked = ref([] as any[]);
    const isChecked = (value: any) => {
      const index = itemsChecked.value.findIndex((val: any) => {
        return val === value;
      });
      return index !== -1;
    };
    const onToggleChecked = (value: any) => {
      const index = itemsChecked.value.findIndex((val: any) => {
        return val === value;
      });
      if (index === -1) {
        itemsChecked.value.push(value);
      } else {
        itemsChecked.value.splice(index, 1);
      }
    };

    const isHasItemsChecked = computed(() => {
      return itemsChecked.value.length > 0;
    });
    const onToggleAllChecked = () => {
      if (isHasItemsChecked.value) {
        itemsChecked.value = [];
      } else {
        itemsChecked.value =
          panelEmployeeLocationListStore.itemsEmployeeLocation?.map(
            (obj: any) => {
              return obj._id;
            },
          );
      }
    };
    //

    // Form
    const isModalOpenForm = ref(false);

    const inputForm = reactive({
      employees: [] as any[],
      locations: [] as any[],
      action: null as any,
    });
    const inputFormDefault = useCloned(inputForm).cloned.value;

    const onResetForm = () => {
      errorForm.value = {};
      inputForm.employees = [];
      inputForm.locations = [];
      objectAssignTarget(inputForm, inputFormDefault);
    };

    const errorForm = ref({} as any);
    const onValidateForm = () => {
      errorForm.value = onValidateInput(inputForm, {
        locations: ['is_not_empty'],
      });
      return isNotEmptyObject(errorForm.value);
    };

    const loadingSubmitForm = ref(false);
    const onSubmitForm = async () => {
      if (onValidateForm()) return;
      if (loadingSubmitForm.value) return;

      isModalOpenForm.value = false;
      inputForm.action = 'UPSERT';
      inputForm.employees = itemsChecked.value;

      dialogStore.open({
        type: 'confirm',
        title: i18n.t('common.confirmation'),
        message: i18n.t('message.before_upsert'),
        icon: 'ph:warning-duotone',
        colorIcon: 'warning',
        textOk: i18n.t('common.continue'),
        colorOk: 'primary',
        onOk: async () => {
          loadingSubmitForm.value = true;

          const res: any = await axios.patch(
            'v1/employee-locations/bulk',
            inputForm,
          );

          if (res.statusCode === 200) {
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_updated'),
            });
            panelEmployeeLocationListStore.onFetchItemsEmployeeLocation(true);
            isModalOpenForm.value = false;
            dialogStore.close();
          } else {
            toastStore.open({
              color: 'danger',
              message: getErrorMessage(res),
            });
          }

          loadingSubmitForm.value = false;
        },
        onCancel: () => {
          dialogStore.close();
          isModalOpenForm.value = true;
        },
      });
    };
    //

    // Add
    const onAddItems = () => {
      onResetForm();
      inputForm.employees = itemsChecked.value;
      isModalOpenForm.value = true;

      selectionStore.onFetchItemsSelectable('LOCATION');
    };

    // Delete
    const loadingDeleteItems = ref(false);
    const onDeleteItems = () => {
      isModalOpenForm.value = false;
      inputForm.action = 'DELETE';
      inputForm.employees = itemsChecked.value;

      dialogStore.open({
        type: 'delete',
        title: i18n.t('common.delete'),
        message: i18n.t('message.before_delete'),
        icon: 'ph:trash-duotone',
        colorIcon: 'danger',
        textOk: 'Delete',
        colorOk: 'danger',
        onOk: async () => {
          loadingDeleteItems.value = true;

          const res: any = await axios.patch(
            'v1/employee-locations/bulk',
            inputForm,
          );

          if (res.statusCode === 200) {
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_deleted'),
            });
            panelEmployeeLocationListStore.onFetchItemsEmployeeLocation(true);
            isModalOpenForm.value = false;
            dialogStore.close();
          } else {
            toastStore.open({
              color: 'danger',
              message: getErrorMessage(res),
            });
          }

          loadingDeleteItems.value = false;
        },
      });
    };
    //

    return {
      isModalOpenForm,
      isHasItemsChecked,
      inputForm,
      errorForm,
      itemsChecked,
      loadingSubmitForm,
      loadingDeleteItems,
      onResetForm,
      onSubmitForm,
      onAddItems,
      onDeleteItems,
      isChecked,
      onToggleChecked,
      onToggleAllChecked,
    };
  },
);
