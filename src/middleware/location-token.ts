export default defineNuxtRouteMiddleware(async (to) => {
  const routeToken = '/location/token';
  const isNotRouteToken = to.path !== routeToken;

  const locationTokenStore = useLocationTokenStore();

  if (!locationTokenStore.isHasToken() && isNotRouteToken) {
    return navigateTo(routeToken, { replace: true });
  }
});
