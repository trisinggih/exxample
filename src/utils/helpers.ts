import {
  isEmail,
  isEmpty,
  isNotEmpty,
  isNumber,
  isNumberString,
} from 'class-validator';

export const isActiveRoute = (path: string) => {
  const route = useRoute();
  const routeTo = path.split('/');
  const routeCurrent = route.path.split('/');
  return routeTo
    .map((x: any) => routeCurrent.find((y: any) => x === y) !== undefined)
    .every((x: any) => x === true);
};

export const isActiveFilter = (obj: any) => {
  return !Object.values(obj).every((value: any) =>
    [null, true, false, ''].includes(value),
  );
};

export const isUserRoles = (roles?: any[]) => {
  if (!roles) return false;
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) return false;
  return roles.includes(authStore.user?.role);
};

export const getDateFormat = (
  value: any,
  format: 'full' | 'short',
  customTimezone?: string,
) => {
  if (!value) return value;
  const { dayjs, timezone } = useNuxtApp();

  switch (format) {
    case 'full':
      return dayjs
        .tz(value)
        .tz(customTimezone || timezone)
        .format('DD MMMM YYYY');
    case 'short':
      return dayjs
        .tz(value)
        .tz(customTimezone || timezone)
        .format('DD MMM YYYY');
  }
};

export const getErrorMessage = (res: any, message?: string) => {
  const { i18n } = useNuxtApp();

  if (res.message) {
    return res.message;
  } else if (message) {
    return message;
  } else {
    return i18n.t('message.error_something_wrong');
  }
};

export const getAvatarDefault = (gender?: string) => {
  switch (gender) {
    case 'M':
      return '/images/placeholder/default-male.jpg';
    case 'F':
      return '/images/placeholder/default-female.jpg';
    default:
      return '/images/placeholder/default-male.jpg';
  }
};

export const onValidateInput = (objInput: any, objRule: any) => {
  const { i18n } = useNuxtApp();
  const objError: any = {};

  Object.keys(objRule).forEach((key) => {
    const rules: string[] = objRule[key];
    const value: any = objInput[key];

    const isOptional = rules.includes('is_optional');
    const isCanValidate = isOptional ? isNotEmpty(value) : true;

    for (const rule of rules) {
      switch (rule) {
        case 'is_not_empty':
          if (isCanValidate) {
            if (Array.isArray(value) && value.length === 0) {
              objError[key] = i18n.t('validation.is_not_empty');
            } else if (isEmpty(value)) {
              objError[key] = i18n.t('validation.is_not_empty');
            }
          }
          break;
        case 'is_email':
          if (value) {
            if (isCanValidate && !isEmail(value)) {
              objError[key] = i18n.t('validation.is_email');
            }
          }
          break;
        case 'is_number':
          if (value) {
            if (isCanValidate && !isNumber(value) && !isNumberString(value)) {
              objError[key] = i18n.t('validation.is_number');
            }
          }
          break;
        case 'is_phone_number':
          if (value) {
            if (isCanValidate && !isNumberString(value)) {
              objError[key] = i18n.t('validation.is_phone_number');
            }
          }
          break;
        case 'min':
          if (value) {
            const min = +rule.split(':')[1] || 0;
            if (isCanValidate && value < min) {
              objError[key] = i18n.t('validation.min', { min: min });
            }
          }
          break;
        case 'max':
          if (value) {
            const max = +rule.split(':')[1] || 0;
            if (isCanValidate && value > max) {
              objError[key] = i18n.t('validation.max', { max: max });
            }
          }
          break;
        case 'min_length':
          if (value && typeof value === 'string') {
            const min = +rule.split(':')[1] || 0;
            if (isCanValidate && value.length < min) {
              objError[key] = i18n.t('validation.min_length', { min: min });
            }
          }
          break;
        case 'max_length':
          if (value && typeof value === 'string') {
            const max = +rule.split(':')[1] || 0;
            if (isCanValidate && value.length > max) {
              objError[key] = i18n.t('validation.max_length', { max: max });
            }
          }
          break;
      }
    }
  });

  return objError;
};

export const objectToFormData = (obj: any) => {
  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (Array.isArray(value)) {
      value.forEach((val, i) => {
        formData.append(`${key}[${i}]`, val);
      });
    } else if (isEmpty(value)) {
      formData.append(key, '');
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

export const objectAssignTarget = (target: any, source: any) => {
  Object.keys(target).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  });
};
