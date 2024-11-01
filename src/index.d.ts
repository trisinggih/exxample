import { i18n } from 'i18next';
import { Dayjs } from 'dayjs';
import { AxiosInstance } from 'axios';

declare module 'dayjs' {
  interface Dayjs {
    utc(): Dayjs;
    local(): Dayjs;
    tz(timezone?: string): Dayjs;
    duration(ms: number): Dayjs;
    isSameOrAfter(compare: dayjs.ConfigType): boolean;
    isSameOrBefore(compare: dayjs.ConfigType): boolean;
  }
}

interface PluginsInjections {
  timezone: any;
  dayjs: Dayjs;
  lang: string;
  i18n: i18n;
  axios: AxiosInstance;
}

declare module '#app' {
  interface NuxtApp extends PluginsInjections {}
}

declare module 'vue' {
  interface NuxtApp extends PluginsInjections {}
}
