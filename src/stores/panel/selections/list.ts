export const usePanelSelectionListStore = defineStore(
  'panelSelectionListStore',
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
        onFetchItemsSelection();
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
      onFetchItemsSelection();
    });

    const getRowNumber = (index: number) => {
      return (inputPagination.page - 1) * inputPagination.per_page + index + 1;
    };
    //

    // Filter
    const isModalOpenFilter = ref(false);

    const inputFilter = reactive({
      type: null as any,
    });
    const inputFilterDefault = useCloned(inputFilter).cloned.value;

    const onResetFilter = () => {
      objectAssignTarget(inputFilter, inputFilterDefault);
    };

    const onApplyFilter = () => {
      onResetPagination();
      onFetchItemsSelection();
      isModalOpenFilter.value = false;
    };
    //

    const itemsSelection = ref([] as any[]);
    const totalSelection = ref(0);
    const loadingItemsSelection = ref(true);
    const onFetchItemsSelection = async () => {
      loadingItemsSelection.value = true;

      const res: any = await axios.get('v1/selections', {
        params: {
          ...inputSearch,
          ...inputPagination,
          ...inputFilter,
        },
      });

      if (res.statusCode === 200) {
        itemsSelection.value = res.data.rows;
        totalSelection.value = res.data.count;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsSelection.value = false;
    };

    const onDeleteItemSelection = (obj: any) => {
      dialogStore.open({
        type: 'delete',
        title: i18n.t('common.delete'),
        message: i18n.t('message.before_delete'),
        icon: 'ph:trash-duotone',
        colorIcon: 'danger',
        textOk: 'Delete',
        colorOk: 'danger',
        onOk: async () => {
          const res: any = await axios.delete(`v1/selections/${obj._id}`);

          if (res.statusCode === 200) {
            dialogStore.close();
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_deleted'),
            });
            onFetchItemsSelection();
          } else {
            toastStore.open({
              color: 'danger',
              message: getErrorMessage(res),
            });
          }
        },
      });
    };

    return {
      isModalOpenFilter,
      totalSelection,
      inputSearch,
      inputPagination,
      inputFilter,
      itemsSelection,
      loadingItemsSelection,
      onResetSearch,
      onResetPagination,
      onResetFilter,
      onApplyFilter,
      onFetchItemsSelection,
      onDeleteItemSelection,
      getRowNumber,
    };
  },
);
