import { isNotEmptyObject } from 'class-validator';

export const useAuthStore = defineStore('authStore', () => {
  const { axios, i18n, dayjs, timezone } = useNuxtApp();

  const toastStore = useToastStore();

  const isLoggedIn = ref(false);
  const user = ref();

  const onFetchUser = async () => {
    isLoggedIn.value = false;

    const res: any = await axios.get('v1/auth/user');

    if (res.statusCode === 200) {
      user.value = res.data;
      isLoggedIn.value = true;
    } else {
      onRefreshToken();
    }
  };

  const inputForm = reactive({
    email: null as any,
    password: null as any,
  });
  const inputFormDefault = useCloned(inputForm).cloned.value;

  const onResetForm = () => {
    errorForm.value = {};
    objectAssignTarget(inputForm, inputFormDefault);
  };

  const errorForm = ref({} as any);

  const onValidateForm = () => {
    errorForm.value = onValidateInput(inputForm, {
      email: ['is_not_empty', 'is_email'],
      password: ['is_not_empty'],
    });
    return isNotEmptyObject(errorForm.value);
  };

  const loadingSubmitForm = ref(false);
  const onSubmitForm = async () => {
    if (onValidateForm()) return;
    if (loadingSubmitForm.value) return;

    loadingSubmitForm.value = true;
    const res: any = await axios.post('v1/auth/login', inputForm);

    if (res.statusCode === 200) {
      onStoreToken(res.data.access_token, res.data.refresh_token);
      nextTick(() => {
        window.location.href = '/panel/dashboard';
      });
    } else {
      toastStore.open({
        message: i18n.t('message.error_email_or_password'),
        color: 'danger',
      });
    }

    loadingSubmitForm.value = false;
  };

  const onLogout = () => {
    const cookieAccessToken = useCookie('access_token');
    const cookieRefreshToken = useCookie('refresh_token');
    cookieAccessToken.value = undefined;
    cookieRefreshToken.value = undefined;

    window.location.href = '/auth/login';
  };

  const onRefreshToken = async () => {
    const res: any = await axios.patch('v1/auth/refresh');

    if (res.statusCode === 200) {
      onStoreToken(res.data.access_token);
      nextTick(() => {
        window.location.reload();
      });
    } else {
      onLogout();
    }
  };

  const onStoreToken = (accessToken: string, refreshToken?: string) => {
    const cookieAccessToken = useCookie('access_token', {
      expires: dayjs.tz().tz(timezone).add(1, 'day').toDate(),
    });
    cookieAccessToken.value = accessToken;

    if (refreshToken) {
      const cookieRefreshToken = useCookie('refresh_token', {
        expires: dayjs.tz().tz(timezone).add(7, 'days').toDate(),
      });
      cookieRefreshToken.value = refreshToken;
    }
  };

  return {
    user,
    isLoggedIn,
    inputForm,
    errorForm,
    loadingSubmitForm,
    onFetchUser,
    onResetForm,
    onValidateForm,
    onSubmitForm,
    onRefreshToken,
    onLogout,
  };
});
