export const itemsPanelSidebarMenu = () => {
  const authStore = useAuthStore();

  const menus = [
    {
      text: 'Dashboard',
      icon: 'ph:house-line-duotone',
      to: '/panel/dashboard',
      roles: ['ADMIN', 'OWNER', 'SUPERVISOR', 'HR'],
    },
    {
      text: 'Attendance',
      icon: 'ph:calendar-duotone',
      to: null,
      roles: ['ADMIN', 'OWNER', 'HR', 'SUPERVISOR'],
      children: [
        {
          text: 'Attendance List',
          icon: 'ph:calendar-blank-duotone',
          to: '/panel/attendance',
          roles: ['ADMIN', 'OWNER', 'HR', 'SUPERVISOR'],
        },
        {
          text: 'Overtime',
          icon: 'ph:clock-duotone',
          to: '/panel/overtime',
          roles: ['ADMIN', 'OWNER', 'HR', 'SUPERVISOR'],
        },
        {
          text: 'Activity Log',
          icon: 'ph:clipboard-text-duotone',
          to: '/panel/activity',
          roles: ['ADMIN', 'OWNER', 'HR', 'SUPERVISOR'],
        },
      ],
    },
    {
      text: 'Employee',
      icon: 'ph:users-duotone',
      to: null,
      roles: ['ADMIN', 'OWNER', 'HR', 'SUPERVISOR'],
      children: [
        {
          text: 'Employee List',
          icon: 'ph:user-list-duotone',
          to: '/panel/employee',
          roles: ['ADMIN', 'OWNER', 'HR', 'SUPERVISOR'],
        },
        {
          text: 'Employee Shift',
          icon: 'ph:calendar-blank-duotone',
          to: '/panel/employee-shift',
          roles: ['ADMIN', 'OWNER', 'HR', 'SUPERVISOR'],
        },
        {
          text: 'Employee Location',
          icon: 'ph:map-pin-duotone',
          to: '/panel/employee-location',
          roles: ['ADMIN', 'OWNER', 'HR', 'SUPERVISOR'],
        },
      ],
    },
    {
      text: 'Master Data',
      icon: 'ph:database-duotone',
      to: null,
      roles: ['ADMIN'],
      children: [
        {
          text: 'Users',
          icon: 'ph:user-duotone',
          to: '/panel/user',
          roles: ['ADMIN'],
        },
        {
          text: 'Locations',
          icon: 'ph:map-pin-duotone',
          to: '/panel/location',
          roles: ['ADMIN'],
        },
        {
          text: 'Shifts',
          icon: 'ph:clock-duotone',
          to: '/panel/shift',
          roles: ['ADMIN'],
        },
        {
          text: 'Selections',
          icon: 'ph:list-dashes-duotone',
          to: '/panel/selection',
          roles: ['ADMIN'],
        },
        {
          text: 'Settings',
          icon: 'ph:gear-duotone',
          to: '/panel/setting',
          roles: ['ADMIN'],
        },
      ],
    },
  ];

  return menus
    ?.map((parent) => {
      parent.children = parent.children?.filter((child) => {
        return child?.roles.includes(authStore.user?.role);
      });
      return parent;
    })
    ?.filter((parent) => {
      return parent?.roles.includes(authStore.user?.role);
    });
};
