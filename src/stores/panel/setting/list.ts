export const usePanelSettingListStore = defineStore(
  'panelSettingListStore',
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
        onFetchItemsSetting();
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
      onFetchItemsSetting();
    });

    const getRowNumber = (index: number) => {
      return (inputPagination.page - 1) * inputPagination.per_page + index + 1;
    };
    //

    const itemsSetting = ref([] as any[]);
    const totalSetting = ref(0);
    const loadingItemsSetting = ref(true);
    const onFetchItemsSetting = async () => {
      loadingItemsSetting.value = true;

      const res: any = await axios.get('v1/settings', {
        params: {
          ...inputSearch,
          ...inputPagination,
        },
      });

      if (res.statusCode === 200) {
        itemsSetting.value = res.data.rows;
        totalSetting.value = res.data.count;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsSetting.value = false;
    };

    const onDeleteItemSetting = (obj: any) => {
      dialogStore.open({
        type: 'delete',
        title: i18n.t('common.delete'),
        message: i18n.t('message.before_delete'),
        icon: 'ph:trash-duotone',
        colorIcon: 'danger',
        textOk: 'Delete',
        colorOk: 'danger',
        onOk: async () => {
          const res: any = await axios.delete(`v1/settings/${obj._id}`);

          if (res.statusCode === 200) {
            dialogStore.close();
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_deleted'),
            });
            onFetchItemsSetting();
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
      totalSetting,
      inputSearch,
      inputPagination,
      itemsSetting,
      loadingItemsSetting,
      onResetSearch,
      onResetPagination,
      onFetchItemsSetting,
      onDeleteItemSetting,
      getRowNumber,
    };
  },
);
