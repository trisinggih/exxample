export default defineNuxtRouteMiddleware(async (to) => {
  const routeLogin = '/auth/login';
  const isNotRouteLogin = to.path !== routeLogin;

  const authStore = useAuthStore();

  if (!authStore.isLoggedIn && isNotRouteLogin) {
    await authStore.onFetchUser();
  }
});
