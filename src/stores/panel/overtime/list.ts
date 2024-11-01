export const usePanelOvertimeListStore = defineStore(
  'panelOvertimeListStore',
  () => {
    const { axios, i18n, dayjs, timezone } = useNuxtApp();

    const toastStore = useToastStore();
    const dialogStore = useDialogStore();

    const panelOvertimeFormStore = usePanelOvertimeFormStore();

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
        onFetchItemsOvertime();
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
      onFetchItemsOvertime();
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
      status: null as any,
      department: null as any,
      job_position: null as any,
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
      onSetItemsColumnDate();
      onFetchItemsOvertime();
      isModalOpenFilter.value = false;
    };
    //

    const itemsOvertime = ref([] as any[]);
    const totalOvertime = ref(0);
    const loadingItemsOvertime = ref(true);
    const onFetchItemsOvertime = async (skipLoading?: boolean) => {
      if (skipLoading) {
        loadingItemsOvertime.value = false;
      } else {
        itemsOvertime.value = [];
        loadingItemsOvertime.value = true;
      }

      const res: any = await axios.get('v1/overtimes', {
        params: {
          ...inputSearch,
          ...inputPagination,
          ...inputFilter,
        },
      });

      if (res.statusCode === 200) {
        itemsOvertime.value = res.data.rows;
        totalOvertime.value = res.data.count;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsOvertime.value = false;
    };

    const onDeleteItemOvertime = (overtimeId: any) => {
      panelOvertimeFormStore.isModalOpenForm = false;

      dialogStore.open({
        type: 'delete',
        title: i18n.t('common.delete'),
        message: i18n.t('message.before_delete'),
        icon: 'ph:trash-duotone',
        colorIcon: 'danger',
        textOk: 'Delete',
        colorOk: 'danger',
        onOk: async () => {
          const res: any = await axios.delete(`v1/overtimes/${overtimeId}`);

          if (res.statusCode === 200) {
            dialogStore.close();
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_deleted'),
            });
            onFetchItemsOvertime();
          } else {
            toastStore.open({
              color: 'danger',
              message: getErrorMessage(res),
            });
          }
        },
        onCancel: () => {
          dialogStore.close();
          panelOvertimeFormStore.isModalOpenForm = true;
        },
      });
    };

    const onAddItemOvertime = (obj: any, date: string) => {
      panelOvertimeFormStore.onResetForm();
      panelOvertimeFormStore.inputForm.employee = obj._id;
      panelOvertimeFormStore.inputForm.date = date;
      panelOvertimeFormStore.isModalOpenForm = true;
    };

    const onEditItemOvertime = (obj: any, date: string, overtimeId: string) => {
      panelOvertimeFormStore.onResetForm();
      panelOvertimeFormStore.overtimeId = overtimeId;
      panelOvertimeFormStore.inputForm.employee = obj._id;
      panelOvertimeFormStore.inputForm.date = date;
      panelOvertimeFormStore.isModalOpenForm = true;
      panelOvertimeFormStore.onFetchItemOvertime();
    };

    const itemsColumnDate = ref([] as string[]);
    const onSetItemsColumnDate = () => {
      itemsColumnDate.value = [];
      if (!inputFilter.start_date || !inputFilter.end_date) {
        return;
      }

      let loopDate = inputFilter.start_date;
      do {
        itemsColumnDate.value.push(loopDate);

        loopDate = dayjs
          .tz(loopDate)
          .tz(timezone)
          .add(1, 'day')
          .format('YYYY-MM-DD');
      } while (
        dayjs.tz(loopDate).tz(timezone).toDate() <=
        dayjs.tz(inputFilter.end_date).tz(timezone).toDate()
      );
    };

    const getItemOvertime = (obj: any, date: string) => {
      return obj.overtimes?.find((overtime: any) => overtime.date === date);
    };

    return {
      isModalOpenFilter,
      inputSearch,
      inputPagination,
      inputFilter,
      itemsOvertime,
      itemsColumnDate,
      totalOvertime,
      loadingItemsOvertime,
      onResetSearch,
      onResetPagination,
      onResetFilter,
      onApplyFilter,
      onFetchItemsOvertime,
      onAddItemOvertime,
      onEditItemOvertime,
      onDeleteItemOvertime,
      onSetItemsColumnDate,
      getItemOvertime,
      getRowNumber,
    };
  },
);
