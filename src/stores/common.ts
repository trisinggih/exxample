export const useCommonStore = defineStore('commonStore', () => {
  const { axios } = useNuxtApp();

  const toastStore = useToastStore();

  const itemDatetime = ref({} as any);
  const loadingItemDatetime = ref(false);
  const onFetchItemDatetime = async () => {
    loadingItemDatetime.value = true;

    const res: any = await axios.get('v1/commons/datetime');

    if (res.statusCode === 200) {
      itemDatetime.value = res.data;
    } else {
      toastStore.open({
        color: 'danger',
        message: getErrorMessage(res),
      });
    }

    loadingItemDatetime.value = false;
  };

  return {
    itemDatetime,
    loadingItemDatetime,
    onFetchItemDatetime,
  };
});
