export default defineNuxtRouteMiddleware((to) => {
  const routeBase = '/';
  const routeLogin = '/auth/login';

  if (to.path === routeBase) {
    return navigateTo(routeLogin, { replace: true });
  }
});
