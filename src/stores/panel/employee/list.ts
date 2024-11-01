export const usePanelEmployeeListStore = defineStore(
  'panelEmployeeListStore',
  () => {
    const { axios, i18n } = useNuxtApp();

    const toastStore = useToastStore();
    const dialogStore = useDialogStore();

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
        onFetchItemsEmployee();
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
      onFetchItemsEmployee();
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
      status: null as any,
    });
    const inputFilterDefault = useCloned(inputFilter).cloned.value;

    const onResetFilter = () => {
      objectAssignTarget(inputFilter, inputFilterDefault);
    };

    const onApplyFilter = () => {
      onResetPagination();
      onFetchItemsEmployee();
      isModalOpenFilter.value = false;
    };
    //

    const itemsEmployee = ref([] as any[]);
    const totalEmployee = ref(0);
    const loadingItemsEmployee = ref(true);
    const onFetchItemsEmployee = async () => {
      loadingItemsEmployee.value = true;

      const res: any = await axios.get('v1/employees', {
        params: {
          ...inputSearch,
          ...inputPagination,
          ...inputFilter,
        },
      });

      if (res.statusCode === 200) {
        itemsEmployee.value = res.data.rows;
        totalEmployee.value = res.data.count;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsEmployee.value = false;
    };

    const onDeleteItemEmployee = (obj: any) => {
      dialogStore.open({
        type: 'delete',
        title: i18n.t('common.delete'),
        message: i18n.t('message.before_delete'),
        icon: 'ph:trash-duotone',
        colorIcon: 'danger',
        textOk: 'Delete',
        colorOk: 'danger',
        onOk: async () => {
          const res: any = await axios.delete(`v1/employees/${obj._id}`);

          if (res.statusCode === 200) {
            dialogStore.close();
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_deleted'),
            });
            onFetchItemsEmployee();
          } else {
            toastStore.open({
              color: 'danger',
              message: getErrorMessage(res),
            });
          }
        },
      });
    };

    const onPrintIdentityCardItemEmployee = async (obj: any) => {
      obj.loadingPrintIdentityCard = true;
      const res: any = await axios.get(
        `v1/employees/${obj._id}/print-identity-card`,
      );

      if (res.statusCode === 200) {
        window.open(res.data, '_blank');
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }
      obj.loadingPrintIdentityCard = false;
    };

    return {
      isModalOpenFilter,
      inputSearch,
      inputPagination,
      inputFilter,
      itemsEmployee,
      totalEmployee,
      loadingItemsEmployee,
      onResetSearch,
      onResetPagination,
      onResetFilter,
      onApplyFilter,
      onFetchItemsEmployee,
      onDeleteItemEmployee,
      onPrintIdentityCardItemEmployee,
      getRowNumber,
    };
  },
);
