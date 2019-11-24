/**
 * Angular Router has problem with concatenated variables when building AOT bundle.
 * Working solution is to create variables with all the paths rather than importing from other modules and concatenating.
 * */

export const AppRoutes = {
  DEFAULT: 'offers',
  AUTH: 'auth',
  LOGIN: 'login',
  BRANDS: 'brands',
  REGISTER: 'register'
};

export const AppRouterLinks = {
  DEFAULT: [AppRoutes.DEFAULT],
  LOGIN: [AppRoutes.AUTH, AppRoutes.LOGIN],
  BRANDS: [AppRoutes.BRANDS],
  REGISTER: [AppRoutes.AUTH, AppRoutes.REGISTER]
};

export const AppRouterUrls = {
  DEFAULT: `/${AppRoutes.DEFAULT}`,
  LOGIN: `/${AppRoutes.AUTH}/${AppRoutes.LOGIN}`,
  BRANDS: `/${AppRoutes.BRANDS}`,
  REGISTER: `/${AppRoutes.AUTH}/${AppRoutes.REGISTER}`
};
