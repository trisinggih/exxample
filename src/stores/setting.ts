export const useSettingStore = defineStore('settingStore', () => {
  const { axios } = useNuxtApp();

  const toastStore = useToastStore();

  const itemSetting = ref({} as any);
  const loadingItemSetting = ref(false);
  const onFetchItemSetting = async () => {
    loadingItemSetting.value = true;

    const res: any = await axios.get('v1/settings', {
      params: {
        page: 1,
        per_page: 9999,
      },
    });

    if (res.statusCode === 200) {
      for (const objSetting of res.data.rows) {
        itemSetting.value[objSetting.key] = objSetting.value;
      }
    } else {
      toastStore.open({
        color: 'danger',
        message: getErrorMessage(res),
      });
    }

    loadingItemSetting.value = false;
  };

  return {
    itemSetting,
    loadingItemSetting,
    onFetchItemSetting,
  };
});
