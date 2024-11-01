export const usePanelEmployeeShiftListStore = defineStore(
  'panelEmployeeShiftListStore',
  () => {
    const { axios, i18n, dayjs, timezone } = useNuxtApp();

    const toastStore = useToastStore();
    const dialogStore = useDialogStore();

    const panelEmployeeShiftFormStore = usePanelEmployeeShiftFormStore();

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
        onFetchItemsEmployeeShift();
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
      onFetchItemsEmployeeShift();
    });

    const getRowNumber = (index: number) => {
      return (inputPagination.page - 1) * inputPagination.per_page + index + 1;
    };
    //

    // Filter
    const isModalOpenFilter = ref(false);

    const inputFilterDefault = {
      date_filter_type: 'WEEK' as any,
      start_date: dayjs
        .tz()
        .tz(timezone)
        .startOf('week')
        .format('YYYY-MM-DD') as any,
      end_date: dayjs
        .tz()
        .tz(timezone)
        .endOf('week')
        .format('YYYY-MM-DD') as any,
      department: null as any,
      job_position: null as any,
    };
    const inputFilter = reactive(useCloned(inputFilterDefault).cloned.value);

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
      onFetchItemsEmployeeShift();
      isModalOpenFilter.value = false;
    };
    //

    const itemsEmployeeShift = ref([] as any[]);
    const totalEmployeeShift = ref(0);
    const loadingItemsEmployeeShift = ref(true);
    const onFetchItemsEmployeeShift = async (skipLoading?: boolean) => {
      if (skipLoading) {
        loadingItemsEmployeeShift.value = false;
      } else {
        itemsEmployeeShift.value = [];
        loadingItemsEmployeeShift.value = true;
      }

      const res: any = await axios.get('v1/employee-shifts', {
        params: {
          ...inputSearch,
          ...inputPagination,
          ...inputFilter,
        },
      });

      if (res.statusCode === 200) {
        itemsEmployeeShift.value = res.data.rows;
        totalEmployeeShift.value = res.data.count;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsEmployeeShift.value = false;
    };

    const onDeleteItemEmployeeShift = (employeeShiftId: any) => {
      panelEmployeeShiftFormStore.isModalOpenForm = false;

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
            `v1/employee-shifts/${employeeShiftId}`,
          );

          if (res.statusCode === 200) {
            dialogStore.close();
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_deleted'),
            });
            onFetchItemsEmployeeShift();
          } else {
            toastStore.open({
              color: 'danger',
              message: getErrorMessage(res),
            });
          }
        },
        onCancel: () => {
          dialogStore.close();
          panelEmployeeShiftFormStore.isModalOpenForm = true;
        },
      });
    };

    const loadingExportEmployeeShift = ref(false);
    const onExportEmployeeShift = async () => {
      loadingExportEmployeeShift.value = true;

      const res: any = await axios.patch('v1/employee-shifts/export', {
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

      loadingExportEmployeeShift.value = false;
    };

    const onAddItemEmployeeShift = (obj: any, date: string) => {
      panelEmployeeShiftFormStore.onResetForm();
      panelEmployeeShiftFormStore.inputForm.employee = obj._id;
      panelEmployeeShiftFormStore.inputForm.date = date;
      panelEmployeeShiftFormStore.isModalOpenForm = true;
    };

    const onEditItemEmployeeShift = (
      obj: any,
      date: string,
      shiftId: string,
    ) => {
      panelEmployeeShiftFormStore.onResetForm();
      panelEmployeeShiftFormStore.employeeShiftId = shiftId;
      panelEmployeeShiftFormStore.inputForm.employee = obj._id;
      panelEmployeeShiftFormStore.inputForm.date = date;
      panelEmployeeShiftFormStore.isModalOpenForm = true;
      panelEmployeeShiftFormStore.onFetchItemEmployeeShift();
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

    const getShift = (obj: any, date: string) => {
      return obj.shifts?.find((shift: any) => shift.date === date);
    };

    return {
      isModalOpenFilter,
      inputSearch,
      inputPagination,
      inputFilter,
      itemsEmployeeShift,
      itemsColumnDate,
      totalEmployeeShift,
      loadingItemsEmployeeShift,
      loadingExportEmployeeShift,
      onResetSearch,
      onResetPagination,
      onResetFilter,
      onApplyFilter,
      onFetchItemsEmployeeShift,
      onExportEmployeeShift,
      onDeleteItemEmployeeShift,
      onAddItemEmployeeShift,
      onEditItemEmployeeShift,
      onSetItemsColumnDate,
      getRowNumber,
      getShift,
    };
  },
);
