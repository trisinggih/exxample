export const useLocationActivityScanStore = defineStore(
  'locationActivityScanStore',
  () => {
    const { axios } = useNuxtApp();

    const toastStore = useToastStore();
    const locationActivityListStore = useLocationActivityListStore();

    const isModalOpen = ref(false);

    const itemScanEmployee = ref({} as any);
    const loadingSubmitScan = ref(false);
    const onSubmitScan = async (qrValue: string) => {
      loadingSubmitScan.value = true;

      let employeeIdentityNumber = null;

      if (!qrValue.startsWith('scan')) {
        toastStore.open({
          color: 'danger',
          message: 'QR-Code Invalid',
        });
        loadingSubmitScan.value = false;
        return;
      } else {
        employeeIdentityNumber = qrValue.replace('scan', '');
      }

      const res: any = await axios.patch('v1/activities/scan', {
        employee_identity_number: employeeIdentityNumber,
      });

      if (res.statusCode === 200) {
        itemScanEmployee.value = res.data.employee;
        locationActivityListStore.onFetchItemsActivity(true);

        toastStore.open({
          color: 'success',
          message: 'Successfully scan employee',
        });
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitScan.value = false;
    };

    return {
      isModalOpen,
      itemScanEmployee,
      loadingSubmitScan,
      onSubmitScan,
    };
  },
);
