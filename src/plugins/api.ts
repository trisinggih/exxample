import Axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

export default defineNuxtPlugin({
  order: 3,
  setup: async (nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();

    const headers: any = {};

    const cookieAccessToken = useCookie('access_token');
    const cookieRefreshToken = useCookie('refresh_token');
    const cookieLocationToken = useCookie('location_token');

    if (cookieAccessToken.value) {
      headers.Authorization = `Bearer ${cookieAccessToken.value}`;
    }

    if (cookieRefreshToken.value) {
      headers['X-Refresh-Token'] = `Bearer ${cookieRefreshToken.value}`;
    }

    if (cookieLocationToken.value) {
      headers['X-Location-Token'] = cookieLocationToken.value;
    }

    if (nuxtApp.timezone) {
      headers['X-Timezone'] = nuxtApp.timezone;
    }

    if (nuxtApp.lang) {
      headers['Accept-Language'] = nuxtApp.lang;
    }

    const onRequest = (req: InternalAxiosRequestConfig) => {
      req.headers = headers;
      return req;
    };

    const onResponse = (res: AxiosResponse) => {
      return res.data;
    };

    const onResponseError = (error: AxiosError) => {
      const dataError = error?.response?.data;
      return dataError;
    };

    const axiosInstance = Axios.create({
      baseURL: runtimeConfig.public.api_url,
    });

    axiosInstance.interceptors.request.use(onRequest);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);

    nuxtApp.axios = axiosInstance;
  },
});
