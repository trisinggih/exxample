export const useSelectionStore = defineStore('selectionStore', () => {
  const { axios, i18n } = useNuxtApp();

  const toastStore = useToastStore();

  const itemSelectable = ref({} as any);
  const loadingItemsSelectable = ref(false);
  const onFetchItemsSelectable = async (type: string) => {
    loadingItemsSelectable.value = true;

    const res: any = await axios.get(`v1/selections/selectable/${type}`);

    if (res.statusCode === 200) {
      itemSelectable.value[type] = res.data;
    } else {
      toastStore.open({
        color: 'danger',
        message: i18n.t('message.error_something_wrong'),
      });
    }

    loadingItemsSelectable.value = false;
  };

  const getItemsSelectable = (key: any): any[] => {
    return itemSelectable.value[key];
  };
  const getSelectable = (key: any, value: any) => {
    return getItemsSelectable(key)?.find((obj: any) => obj.value === value);
  };

  return {
    itemSelectable,
    loadingItemsSelectable,
    getItemsSelectable,
    getSelectable,
    onFetchItemsSelectable,
  };
});
