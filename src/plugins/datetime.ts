import dayjs from 'dayjs';
import pluginUtc from 'dayjs/plugin/utc';
import pluginDuration from 'dayjs/plugin/duration';
import pluginTimezone from 'dayjs/plugin/timezone';
import pluginRelativeTime from 'dayjs/plugin/relativeTime';
import pluginIsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import pluginIsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/id';

export default defineNuxtPlugin({
  order: 2,
  setup: (nuxtApp) => {
    const lang: any = nuxtApp.lang || 'id';

    dayjs.extend(pluginUtc);
    dayjs.extend(pluginDuration);
    dayjs.extend(pluginTimezone);
    dayjs.extend(pluginRelativeTime);
    dayjs.extend(pluginIsSameOrAfter);
    dayjs.extend(pluginIsSameOrBefore);
    dayjs.locale(lang);
    dayjs.tz.setDefault('UTC');

    nuxtApp.timezone = dayjs.tz.guess();
    nuxtApp.dayjs = dayjs;
  },
});
