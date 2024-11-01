export const useLocationActivityListStore = defineStore(
  'locationActivityListStore',
  () => {
    const { axios } = useNuxtApp();

    const toastStore = useToastStore();
    const locationTokenStore = useLocationTokenStore();

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

    const itemsActivity = ref([] as any[]);
    const totalActivity = ref(0);
    const totalEmployee = ref(0);
    const loadingItemsActivity = ref(true);
    const onFetchItemsActivity = async (skipLoading?: boolean) => {
      if (skipLoading) {
        loadingItemsActivity.value = false;
      } else {
        itemsActivity.value = [];
        loadingItemsActivity.value = true;
      }

      const res: any = await axios.get('v1/activities/location', {
        params: {
          ...inputPagination,
        },
      });

      if (res.statusCode === 200) {
        itemsActivity.value = res.data.rows;
        totalActivity.value = res.data.count;
        totalEmployee.value = res.data.count_employee;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemsActivity.value = false;
    };

    const itemLocation = ref();
    const loadingItemLocation = ref(false);
    const onFetchItemLocation = async () => {
      loadingItemLocation.value = true;

      const res: any = await axios.get(`v1/locations/token`, {
        params: {
          location_token: locationTokenStore.getToken(),
        },
      });

      if (res.statusCode === 200) {
        itemLocation.value = res.data;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemLocation.value = false;
    };

    return {
      inputPagination,
      itemLocation,
      itemsActivity,
      totalActivity,
      totalEmployee,
      loadingItemLocation,
      loadingItemsActivity,
      onResetPagination,
      onFetchItemLocation,
      onFetchItemsActivity,
      getRowNumber,
    };
  },
);
