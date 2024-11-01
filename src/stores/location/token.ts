import { isNotEmpty, isNotEmptyObject } from 'class-validator';

export const useLocationTokenStore = defineStore('locationTokenStore', () => {
  const { axios, dayjs, timezone } = useNuxtApp();

  const toastStore = useToastStore();

  const getToken = () => {
    const cookieLocationToken = useCookie('location_token');
    return cookieLocationToken.value;
  };

  const isHasToken = () => {
    return isNotEmpty(getToken());
  };

  const inputForm = reactive({
    token: null as any,
  });
  const inputFormDefault = useCloned(inputForm).cloned.value;

  const onResetForm = () => {
    errorForm.value = {};
    objectAssignTarget(inputForm, inputFormDefault);
  };

  const errorForm = ref({} as any);

  const onValidateForm = () => {
    errorForm.value = onValidateInput(inputForm, {
      token: ['is_not_empty'],
    });
    return isNotEmptyObject(errorForm.value);
  };
  const loadingSubmitForm = ref(false);
  const onSubmitForm = async () => {
    if (onValidateForm()) return;
    if (loadingSubmitForm.value) return;

    loadingSubmitForm.value = true;

    const cookieLocationToken = useCookie('location_token', {
      expires: dayjs.tz().tz(timezone).add(7, 'day').toDate(),
    });
    cookieLocationToken.value = inputForm.token;

    setTimeout(async () => {
      const res: any = await axios.get('v1/locations/token', {
        params: {
          location_token: inputForm.token,
        },
      });

      if (res.statusCode === 200) {
        window.location.href = '/location/activity';
      } else {
        toastStore.open({
          color: 'danger',
          message: getErrorMessage(res),
        });
      }

      loadingSubmitForm.value = false;
    }, 500);
  };

  const onClearToken = () => {
    const cookieLocationToken = useCookie('location_token');
    cookieLocationToken.value = undefined;
    window.location.href = '/location/token';
  };

  return {
    inputForm,
    errorForm,
    loadingSubmitForm,
    onResetForm,
    onSubmitForm,
    getToken,
    isHasToken,
    onClearToken,
  };
});
