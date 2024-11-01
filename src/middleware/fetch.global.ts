export default defineNuxtRouteMiddleware(async () => {
  const selectionStore = useSelectionStore();

  const keysSelectable = [
    'DATE_FILTER_TYPE',
    'GENDER',
    'USER_ROLE',
    'PUBLIC_FILE',
    'COUNTRY',
    'ACTIVATION_STATUS',
    'ACTIVITY_TYPE',
    'ATTENDANCE_STATUS',
    'LOCATION_SCAN_TYPE',
    'SELECTION_TYPE',
    'BRANCH',
    'DEPARTMENT',
    'JOB_POSITION',
    'JOB_LEVEL',
    'TAX_STATUS',
    'EMPLOYEE_STATUS',
  ];

  for (const key of keysSelectable) {
    if (!selectionStore.itemSelectable[key]) {
      selectionStore.onFetchItemsSelectable(key);
    }
  }
});
