export const usePanelUserListStore = defineStore('panelUserListStore', () => {
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
      onFetchItemsUser();
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
    onFetchItemsUser();
  });

  const getRowNumber = (index: number) => {
    return (inputPagination.page - 1) * inputPagination.per_page + index + 1;
  };
  //

  // Filter
  const isModalOpenFilter = ref(false);

  const inputFilter = reactive({
    role: null as any,
    status: null as any,
  });
  const inputFilterDefault = useCloned(inputFilter).cloned.value;

  const onResetFilter = () => {
    objectAssignTarget(inputFilter, inputFilterDefault);
  };

  const onApplyFilter = () => {
    onResetPagination();
    onFetchItemsUser();
    isModalOpenFilter.value = false;
  };
  //

  const itemsUser = ref([] as any[]);
  const totalUser = ref(0);
  const loadingItemsUser = ref(true);
  const onFetchItemsUser = async () => {
    loadingItemsUser.value = true;

    const res: any = await axios.get('v1/users', {
      params: {
        ...inputSearch,
        ...inputPagination,
        ...inputFilter,
      },
    });

    if (res.statusCode === 200) {
      itemsUser.value = res.data.rows;
      totalUser.value = res.data.count;
    } else {
      toastStore.open({
        color: 'danger',
        message: getErrorMessage(res),
      });
    }

    loadingItemsUser.value = false;
  };

  const onDeleteItemUser = (obj: any) => {
    dialogStore.open({
      type: 'delete',
      title: i18n.t('common.delete'),
      message: i18n.t('message.before_delete'),
      icon: 'ph:trash-duotone',
      colorIcon: 'danger',
      textOk: 'Delete',
      colorOk: 'danger',
      onOk: async () => {
        const res: any = await axios.delete(`v1/users/${obj._id}`);

        if (res.statusCode === 200) {
          dialogStore.close();
          toastStore.open({
            color: 'success',
            message: i18n.t('message.success_deleted'),
          });
          onFetchItemsUser();
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
    inputSearch,
    inputPagination,
    inputFilter,
    itemsUser,
    totalUser,
    loadingItemsUser,
    onResetSearch,
    onResetPagination,
    onResetFilter,
    onApplyFilter,
    onFetchItemsUser,
    onDeleteItemUser,
    getRowNumber,
  };
});
