interface Dialog {
  type: 'success' | 'confirm' | 'delete';
  message: string;
  title?: string;
  icon?: string;
  colorIcon?: 'primary' | 'success' | 'warning' | 'danger' | 'light';
  colorOk?: 'primary' | 'success' | 'warning' | 'danger' | 'light';
  colorCancel?: 'primary' | 'success' | 'warning' | 'danger' | 'light';
  textOk?: string;
  textCancel?: string;
  onOk?: () => any;
  onCancel?: () => any;
  classes?: {
    buttonOk?: string;
    buttonCancel?: string;
  };
}

export const useDialogStore = defineStore('dialogStore', () => {
  const dialog = ref({} as Dialog);
  const isModalOpen = ref(false);

  const open = (obj: Dialog) => {
    dialog.value = obj;
    isModalOpen.value = true;
  };

  const close = () => {
    isModalOpen.value = false;
    setTimeout(() => {
      dialog.value = {} as Dialog;
    }, 500);
  };

  return {
    isModalOpen,
    dialog,
    open,
    close,
  };
});
