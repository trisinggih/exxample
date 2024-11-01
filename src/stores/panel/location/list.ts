export const usePanelLocationListStore = defineStore(
  'panelLocationListStore',
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
        onFetchItemsLocation();
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
      onFetchItemsLocation();
    });

    const getRowNumber = (index: number) => {
      return (inputPagination.page - 1) * inputPagination.per_page + index + 1;
    };
    //

    const itemsLocation = ref([] as any[]);
    const totalLocation = ref(0);
    const loadingItemsLocation = ref(true);
    const onFetchItemsLocation = async () => {
      loadingItemsLocation.value = true;

      const res: any = await axios.get('v1/locations', {
        params: {
          ...inputSearch,
          ...inputPagination,
        },
      });

      if (res.statusCode === 200) {
        itemsLocation.value = res.data.rows;
        totalLocation.value = res.data.count;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsLocation.value = false;
    };

    const onDeleteItemLocation = (obj: any) => {
      dialogStore.open({
        type: 'delete',
        title: i18n.t('common.delete'),
        message: i18n.t('message.before_delete'),
        icon: 'ph:trash-duotone',
        colorIcon: 'danger',
        textOk: 'Delete',
        colorOk: 'danger',
        onOk: async () => {
          const res: any = await axios.delete(`v1/locations/${obj._id}`);

          if (res.statusCode === 200) {
            dialogStore.close();
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_deleted'),
            });
            onFetchItemsLocation();
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
      inputSearch,
      inputPagination,
      itemsLocation,
      totalLocation,
      loadingItemsLocation,
      onResetSearch,
      onResetPagination,
      onFetchItemsLocation,
      onDeleteItemLocation,
      getRowNumber,
    };
  },
);
