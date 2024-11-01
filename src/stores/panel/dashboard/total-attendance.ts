export const usePanelDashboardTotalAttendanceStore = defineStore(
  'panelDashboardTotalAttendanceStore',
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
      onFetchItemTotalAttendance();
    });
    //

    const itemTotalAttendance = ref({} as any);
    const loadingItemTotalAttendance = ref(true);
    const onFetchItemTotalAttendance = async () => {
      loadingItemTotalAttendance.value = true;

      const res: any = await axios.get('v1/dashboards/total-attendance', {
        params: {
          ...inputFilter,
        },
      });

      if (res.statusCode === 200) {
        itemTotalAttendance.value = res.data;
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingItemTotalAttendance.value = false;
    };

    return {
      inputFilter,
      itemTotalAttendance,
      loadingItemTotalAttendance,
      onResetFilter,
      onFetchItemTotalAttendance,
    };
  },
);
