export const usePanelActivityListStore = defineStore(
  'panelActivityListStore',
  () => {
    const { axios, dayjs, timezone } = useNuxtApp();

    const toastStore = useToastStore();

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
        onFetchItemsActivity();
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
      onFetchItemsActivity();
    });

    const getRowNumber = (index: number) => {
      return (inputPagination.page - 1) * inputPagination.per_page + index + 1;
    };
    //

    // Filter
    const isModalOpenFilter = ref(false);

    const inputFilter = reactive({
      date_filter_type: 'TODAY' as any,
      start_date: dayjs.tz().tz(timezone).format('YYYY-MM-DD') as any,
      end_date: dayjs.tz().tz(timezone).format('YYYY-MM-DD') as any,
      activity_type: null as any,
      department: null as any,
      job_position: null as any,
      location: null as any,
    });
    const inputFilterDefault = useCloned(inputFilter).cloned.value;

    const inputFilterDateFilterType = computed(() => {
      return inputFilter.date_filter_type;
    });

    watchDeep(inputFilterDateFilterType, (value: any) => {
      if (value === 'TODAY') {
        inputFilter.start_date = dayjs.tz().tz(timezone).format('YYYY-MM-DD');
        inputFilter.end_date = dayjs.tz().tz(timezone).format('YYYY-MM-DD');
      }

      if (value === 'WEEK') {
        inputFilter.start_date = dayjs
          .tz()
          .tz(timezone)
          .startOf('week')
          .format('YYYY-MM-DD');
        inputFilter.end_date = dayjs
          .tz()
          .tz(timezone)
          .endOf('week')
          .format('YYYY-MM-DD');
      }

      if (value === 'MONTH') {
        inputFilter.start_date = dayjs
          .tz()
          .tz(timezone)
          .startOf('month')
          .format('YYYY-MM-DD');
        inputFilter.end_date = dayjs
          .tz()
          .tz(timezone)
          .endOf('month')
          .format('YYYY-MM-DD');
      }

      if (value === 'CUSTOM' || value === null) {
        inputFilter.start_date = null;
        inputFilter.end_date = null;
      }
    });

    const onResetFilter = () => {
      objectAssignTarget(inputFilter, inputFilterDefault);
    };

    const onApplyFilter = () => {
      onResetPagination();
      onFetchItemsActivity();
      isModalOpenFilter.value = false;
    };
    //

    const itemsActivity = ref([] as any[]);
    const totalActivity = ref(0);
    const loadingItemsActivity = ref(true);
    const onFetchItemsActivity = async () => {
      loadingItemsActivity.value = true;

      const res: any = await axios.get('v1/activities', {
        params: {
          ...inputSearch,
          ...inputPagination,
          ...inputFilter,
        },
      });

      if (res.statusCode === 200) {
        itemsActivity.value = res.data.rows;
        totalActivity.value = res.data.count;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsActivity.value = false;
    };

    // Download log
    const loadingDownloadLog = ref(false);
    const onDownloadLog = async () => {
      loadingDownloadLog.value = true;

      const res: any = await axios.patch('v1/activities/log', {
        ...inputSearch,
        ...inputFilter,
      });

      if (res.statusCode === 200) {
        window.open(res.data, '_blank');
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingDownloadLog.value = false;
    };
    //

    return {
      isModalOpenFilter,
      inputSearch,
      inputPagination,
      inputFilter,
      itemsActivity,
      totalActivity,
      loadingItemsActivity,
      loadingDownloadLog,
      onResetSearch,
      onResetPagination,
      onResetFilter,
      onApplyFilter,
      onFetchItemsActivity,
      onDownloadLog,
      getRowNumber,
    };
  },
);
