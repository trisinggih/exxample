import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const usePanelEmployeeShiftBulkStore = defineStore(
  'panelEmployeeShiftBulkStore',
  () => {
    const { axios, i18n } = useNuxtApp();

    const toastStore = useToastStore();
    const dialogStore = useDialogStore();
    const selectionStore = useSelectionStore();

    const panelEmployeeShiftListStore = usePanelEmployeeShiftListStore();

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
          panelEmployeeShiftListStore.itemsEmployeeShift?.map((obj: any) => {
            return obj._id;
          });
      }
    };
    //

    // Form
    const isModalOpenForm = ref(false);

    const inputFormDefault = {
      employees: [] as any[],
      shift: null as any,
      from_date: null as any,
      to_date: null as any,
      start_time: null as any,
      end_time: null as any,
      action: null as any,
    };
    const inputForm = reactive(useCloned(inputFormDefault).cloned.value);

    const isInputFormSelectShift = computed(() => {
      return isNotEmpty(inputForm.shift);
    });

    const inputFormShift = computed(() => inputForm.shift);
    watch(inputFormShift, (value: any) => {
      if (value) {
        const objShift = selectionStore.getSelectable(
          'SHIFT',
          inputFormShift.value,
        );

        inputForm.start_time = objShift?.start_time;
        inputForm.end_time = objShift?.end_time;
      }
    });

    const onResetForm = () => {
      errorForm.value = {};
      inputForm.employees = [];
      objectAssignTarget(inputForm, inputFormDefault);
    };

    const errorForm = ref({} as any);
    const onValidateForm = () => {
      errorForm.value = onValidateInput(inputForm, {
        from_date: ['is_not_empty'],
        to_date: ['is_not_empty'],
        start_time: ['is_not_empty'],
        end_time: ['is_not_empty'],
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
      inputForm.from_date = panelEmployeeShiftListStore.inputFilter.start_date;
      inputForm.to_date = panelEmployeeShiftListStore.inputFilter.end_date;

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
            'v1/employee-shifts/bulk',
            inputForm,
          );

          if (res.statusCode === 200) {
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_updated'),
            });
            panelEmployeeShiftListStore.onFetchItemsEmployeeShift(true);
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
      inputForm.from_date = panelEmployeeShiftListStore.inputFilter.start_date;
      inputForm.to_date = panelEmployeeShiftListStore.inputFilter.end_date;
      isModalOpenForm.value = true;
    };

    // Delete
    const loadingDeleteItems = ref(false);
    const onDeleteItems = () => {
      isModalOpenForm.value = false;
      inputForm.action = 'DELETE';
      inputForm.employees = itemsChecked.value;
      inputForm.from_date = panelEmployeeShiftListStore.inputFilter.start_date;
      inputForm.to_date = panelEmployeeShiftListStore.inputFilter.end_date;

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
            'v1/employee-shifts/bulk',
            inputForm,
          );

          if (res.statusCode === 200) {
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_deleted'),
            });
            panelEmployeeShiftListStore.onFetchItemsEmployeeShift(true);
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
      isInputFormSelectShift,
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
