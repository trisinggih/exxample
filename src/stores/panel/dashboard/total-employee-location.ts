export const usePanelDashboardTotalEmployeeLocationStore = defineStore(
  'panelDashboardTotalEmployeeLocationStore',
  () => {
    const { axios, dayjs, timezone } = useNuxtApp();

    const toastStore = useToastStore();

    // Filter
    const inputFilter = reactive({
      date: dayjs.tz().tz(timezone).format('YYYY-MM-DD'),
    });
    const inputFilterDefault = useCloned(inputFilter).cloned.value;

    const onResetFilter = () => {
      objectAssignTarget(inputFilter, inputFilterDefault);
    };

    watchDeep(inputFilter, () => {
      onFetchItemsTotalEmployeeLocation();
    });
    //

    // List
    const itemsTotalEmployeeLocation = ref([] as any[]);
    const loadingItemsTotalEmployeeLocation = ref(true);
    const onFetchItemsTotalEmployeeLocation = async (skipLoading?: boolean) => {
      if (skipLoading) {
        loadingItemsTotalEmployeeLocation.value = false;
      } else {
        itemsTotalEmployeeLocation.value = [];
        loadingItemsTotalEmployeeLocation.value = true;
      }

      const res: any = await axios.get(
        'v1/dashboards/total-employee-location',
        {
          params: {
            ...inputFilter,
          },
        },
      );

      if (res.statusCode === 200) {
        itemsTotalEmployeeLocation.value = res.data;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsTotalEmployeeLocation.value = false;
    };
    //

    // Detail
    const isModalOpenDetail = ref(false);
    const onOpenModalDetail = (locationId: string) => {
      onFetchItemsDetailEmployeeLocation(locationId);
      isModalOpenDetail.value = true;
    };
    const onCloseModalDetail = () => {
      isModalOpenDetail.value = false;
    };

    const itemsDetailEmployeeLocation = ref([] as any[]);
    const loadingItemsDetailEmployeeLocation = ref(true);
    const onFetchItemsDetailEmployeeLocation = async (locationId: string) => {
      itemsDetailEmployeeLocation.value = [];
      loadingItemsDetailEmployeeLocation.value = true;

      const res: any = await axios.get(
        `v1/dashboards/total-employee-location/${locationId}`,
        {
          params: {
            ...inputFilter,
          },
        },
      );

      if (res.statusCode === 200) {
        itemsDetailEmployeeLocation.value = res.data;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsDetailEmployeeLocation.value = false;
    };
    //

    return {
      isModalOpenDetail,
      inputFilter,
      itemsTotalEmployeeLocation,
      itemsDetailEmployeeLocation,
      loadingItemsTotalEmployeeLocation,
      loadingItemsDetailEmployeeLocation,
      onResetFilter,
      onOpenModalDetail,
      onCloseModalDetail,
      onFetchItemsTotalEmployeeLocation,
      onFetchItemsDetailEmployeeLocation,
    };
  },
);
