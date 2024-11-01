export const usePanelShiftListStore = defineStore('panelShiftListStore', () => {
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
      onFetchItemsShift();
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
    onFetchItemsShift();
  });

  const getRowNumber = (index: number) => {
    return (inputPagination.page - 1) * inputPagination.per_page + index + 1;
  };
  //

  const itemsShift = ref([] as any[]);
  const totalShift = ref(0);
  const loadingItemsShift = ref(true);
  const onFetchItemsShift = async () => {
    loadingItemsShift.value = true;

    const res: any = await axios.get('v1/shifts', {
      params: {
        ...inputSearch,
        ...inputPagination,
      },
    });

    if (res.statusCode === 200) {
      itemsShift.value = res.data.rows;
      totalShift.value = res.data.count;
    } else {
      toastStore.open({
        color: 'danger',
        message: getErrorMessage(res),
      });
    }

    loadingItemsShift.value = false;
  };

  const onDeleteItemShift = (obj: any) => {
    dialogStore.open({
      type: 'delete',
      title: i18n.t('common.delete'),
      message: i18n.t('message.before_delete'),
      icon: 'ph:trash-duotone',
      colorIcon: 'danger',
      textOk: 'Delete',
      colorOk: 'danger',
      onOk: async () => {
        const res: any = await axios.delete(`v1/shifts/${obj._id}`);

        if (res.statusCode === 200) {
          dialogStore.close();
          toastStore.open({
            color: 'success',
            message: i18n.t('message.success_deleted'),
          });
          onFetchItemsShift();
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
    totalShift,
    inputSearch,
    inputPagination,
    itemsShift,
    loadingItemsShift,
    onResetSearch,
    onResetPagination,
    onFetchItemsShift,
    onDeleteItemShift,
    getRowNumber,
  };
});
