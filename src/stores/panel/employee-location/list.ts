export const usePanelEmployeeLocationListStore = defineStore(
  'panelEmployeeLocationListStore',
  () => {
    const { axios, i18n } = useNuxtApp();

    const toastStore = useToastStore();
    const dialogStore = useDialogStore();

    const selectionStore = useSelectionStore();
    const panelEmployeeLocationFormStore = usePanelEmployeeLocationFormStore();

    // Search
    const inputSearch = reactive({
      search: null as any,
    });
    const inputSearchDefault = useCloned(inputSearch).cloned.value;

    const onResetSearch = () => {
      objectAssignTarget(inputSearch, inputSearchDefault);
    };

    watchDebounced(
      inputSearch,
      () => {
        onResetPagination();
        onFetchItemsEmployeeLocation();
      },
      { debounce: 750 },
    );
    //

    // Pagination
    const inputPagination = reactive({
      page: 1,
      per_page: 10,
    });
    const inputPaginationDefault = useCloned(inputPagination).cloned.value;

    const onResetPagination = () => {
      objectAssignTarget(inputPagination, inputPaginationDefault);
    };

    watchDeep(inputPagination, () => {
      onFetchItemsEmployeeLocation();
    });

    const getRowNumber = (index: number) => {
      return (inputPagination.page - 1) * inputPagination.per_page + index + 1;
    };
    //

    // Filter
    const isModalOpenFilter = ref(false);

    const inputFilter = reactive({
      department: null as any,
      job_position: null as any,
    });
    const inputFilterDefault = useCloned(inputFilter).cloned.value;

    const onResetFilter = () => {
      objectAssignTarget(inputFilter, inputFilterDefault);
    };

    const onApplyFilter = () => {
      onResetPagination();
      onFetchItemsEmployeeLocation();
      isModalOpenFilter.value = false;
    };

    const itemsEmployeeLocation = ref([] as any[]);
    const totalEmployeeLocation = ref(0);
    const loadingItemsEmployeeLocation = ref(true);
    const onFetchItemsEmployeeLocation = async (skipLoading?: boolean) => {
      if (skipLoading) {
        loadingItemsEmployeeLocation.value = false;
      } else {
        itemsEmployeeLocation.value = [];
        loadingItemsEmployeeLocation.value = true;
      }

      const res: any = await axios.get('v1/employee-locations', {
        params: {
          ...inputSearch,
          ...inputPagination,
          ...inputFilter,
        },
      });

      if (res.statusCode === 200) {
        itemsEmployeeLocation.value = res.data.rows;
        totalEmployeeLocation.value = res.data.count;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsEmployeeLocation.value = false;
    };

    const onDeleteItemEmployeeLocation = (employeeLocationId: any) => {
      panelEmployeeLocationFormStore.isModalOpenForm = false;

      dialogStore.open({
        type: 'delete',
        title: i18n.t('common.delete'),
        message: i18n.t('message.before_delete'),
        icon: 'ph:trash-duotone',
        colorIcon: 'danger',
        textOk: 'Delete',
        colorOk: 'danger',
        onOk: async () => {
          const res: any = await axios.delete(
            `v1/employee-locations/${employeeLocationId}`,
          );

          if (res.statusCode === 200) {
            dialogStore.close();
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_deleted'),
            });
            onFetchItemsEmployeeLocation();
          } else {
            toastStore.open({
              color: 'danger',
              message: getErrorMessage(res),
            });
          }
        },
        onCancel: () => {
          dialogStore.close();
          panelEmployeeLocationFormStore.isModalOpenForm = true;
        },
      });
    };

    const onAddItemEmployeeLocation = (obj: any) => {
      panelEmployeeLocationFormStore.onResetForm();
      panelEmployeeLocationFormStore.inputForm.employee = obj._id;
      panelEmployeeLocationFormStore.isModalOpenForm = true;

      selectionStore.onFetchItemsSelectable('LOCATION');
    };

    const onEditItemEmployeeLocation = async (
      obj: any,
      employeeLocationId: string,
    ) => {
      panelEmployeeLocationFormStore.onResetForm();
      panelEmployeeLocationFormStore.employeeLocationId = employeeLocationId;
      panelEmployeeLocationFormStore.inputForm.employee = obj._id;
      panelEmployeeLocationFormStore.isModalOpenForm = true;

      await selectionStore.onFetchItemsSelectable('LOCATION');
      panelEmployeeLocationFormStore.onFetchItemEmployeeLocation();
    };

    return {
      isModalOpenFilter,
      inputSearch,
      inputPagination,
      inputFilter,
      itemsEmployeeLocation,
      totalEmployeeLocation,
      loadingItemsEmployeeLocation,
      onResetSearch,
      onResetPagination,
      onResetFilter,
      onApplyFilter,
      onFetchItemsEmployeeLocation,
      onDeleteItemEmployeeLocation,
      onAddItemEmployeeLocation,
      onEditItemEmployeeLocation,
      getRowNumber,
    };
  },
);
