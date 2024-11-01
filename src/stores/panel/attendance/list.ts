export const usePanelAttendanceListStore = defineStore(
  'panelAttendanceListStore',
  () => {
    const { axios, i18n, dayjs, timezone } = useNuxtApp();

    const toastStore = useToastStore();
    const dialogStore = useDialogStore();

    const panelAttendanceFormStore = usePanelAttendanceFormStore();

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
        onFetchItemsAttendance();
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
      onFetchItemsAttendance();
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
      onFetchItemsAttendance();
      isModalOpenFilter.value = false;
    };
    //

    const itemsAttendance = ref([] as any[]);
    const totalAttendance = ref(0);
    const loadingItemsAttendance = ref(true);
    const onFetchItemsAttendance = async (skipLoading?: boolean) => {
      if (skipLoading) {
        loadingItemsAttendance.value = false;
      } else {
        itemsAttendance.value = [];
        loadingItemsAttendance.value = true;
      }

      const res: any = await axios.get('v1/attendances', {
        params: {
          ...inputSearch,
          ...inputPagination,
          ...inputFilter,
        },
      });

      if (res.statusCode === 200) {
        itemsAttendance.value = res.data.rows;
        totalAttendance.value = res.data.count;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsAttendance.value = false;
    };

    const onDeleteItemAttendance = (attendanceId: any) => {
      panelAttendanceFormStore.isModalOpenForm = false;

      dialogStore.open({
        type: 'delete',
        title: i18n.t('common.delete'),
        message: i18n.t('message.before_delete'),
        icon: 'ph:trash-duotone',
        colorIcon: 'danger',
        textOk: 'Delete',
        colorOk: 'danger',
        onOk: async () => {
          const res: any = await axios.delete(`v1/attendances/${attendanceId}`);

          if (res.statusCode === 200) {
            dialogStore.close();
            toastStore.open({
              color: 'success',
              message: i18n.t('message.success_deleted'),
            });
            onFetchItemsAttendance();
          } else {
            toastStore.open({
              color: 'danger',
              message: getErrorMessage(res),
            });
          }
        },
        onCancel: () => {
          dialogStore.close();
          panelAttendanceFormStore.isModalOpenForm = true;
        },
      });
    };

    const loadingReportAttendance = ref(false);
    const onReportAttendance = async () => {
      loadingReportAttendance.value = true;

      const res: any = await axios.patch('v1/attendances/report', {
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

      loadingReportAttendance.value = false;
    };

    const onAddItemAttendance = (obj: any, date: string) => {
      panelAttendanceFormStore.onResetForm();
      panelAttendanceFormStore.inputForm.employee = obj._id;
      panelAttendanceFormStore.inputForm.date = date;
      panelAttendanceFormStore.isModalOpenForm = true;
    };

    const onEditItemAttendance = (
      obj: any,
      date: string,
      attendanceId: string,
    ) => {
      panelAttendanceFormStore.onResetForm();
      panelAttendanceFormStore.attendanceId = attendanceId;
      panelAttendanceFormStore.inputForm.employee = obj._id;
      panelAttendanceFormStore.inputForm.date = date;
      panelAttendanceFormStore.isModalOpenForm = true;
      panelAttendanceFormStore.onFetchItemAttendance();
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

    const getItemAttendance = (obj: any, date: string) => {
      return obj.attendances?.find(
        (attendance: any) => attendance.date === date,
      );
    };

    return {
      isModalOpenFilter,
      inputSearch,
      inputPagination,
      inputFilter,
      itemsAttendance,
      itemsColumnDate,
      totalAttendance,
      loadingItemsAttendance,
      loadingReportAttendance,
      onResetSearch,
      onResetPagination,
      onResetFilter,
      onApplyFilter,
      onFetchItemsAttendance,
      onAddItemAttendance,
      onEditItemAttendance,
      onDeleteItemAttendance,
      onReportAttendance,
      onSetItemsColumnDate,
      getItemAttendance,
      getRowNumber,
    };
  },
);
