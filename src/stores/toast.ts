interface Toast {
  message: string;
  color?: 'success' | 'danger';
  timeout?: any;
  key?: number;
}

export const useToastStore = defineStore('toastStore', () => {
  const toasts = ref([] as Toast[]);

  const open = (toast: Toast) => {
    toast.key = new Date().getTime();
    toast.timeout = setTimeout(() => {
      const index = toasts.value.findIndex((obj) => obj.key === toast.key);
      toasts.value.splice(index, 1);
    }, 5000);

    toasts.value.unshift(toast);
  };

  const close = (index: number) => {
    toasts.value.splice(index, 1);
  };

  return {
    toasts,
    open,
    close,
  };
});
