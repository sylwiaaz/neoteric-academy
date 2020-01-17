/**
 * Angular Router has problem with concatenated variables when building AOT bundle.
 * Working solution is to create variables with all the paths rather than importing from other modules and concatenating.
 * */

export const AppRoutes = {
  DEFAULT: 'offers',
  AUTH: 'auth',
  LOGIN: 'login',
  BRANDS: 'brands',
  REGISTER: 'register',
  DASHBOARD: 'dashboard',
  PROFILE: 'profile',
  PREFERENCES: 'preferences',
  SETTINGS: 'settings',
  MATCHMAKING: 'matchmaking',
  OFFER: 'offer',
  OFFERID: ':id',
  PLACE: ':place',
  FILTERTECH: ':place/:tech',
  FILTEREXP: ':place/:tech/:exp',
  FILTERMINSAL: ':place/:tech/:exp/:minSal',
  FILTERMAXSAL: ':place/:tech/:exp/:minSal/:maxSal',
  ADDOFFER: 'add-offer'
};

export const AppRouterLinks = {
  DEFAULT: [AppRoutes.DEFAULT],
  LOGIN: [AppRoutes.AUTH, AppRoutes.LOGIN],
  BRANDS: [AppRoutes.BRANDS],
  DASHBOARD: [AppRoutes.DASHBOARD],
  PROFILE: [AppRoutes.DASHBOARD, AppRoutes.PROFILE],
  PREFERENCES: [AppRoutes.DASHBOARD, AppRoutes.PREFERENCES],
  SETTINGS: [AppRoutes.DASHBOARD, AppRoutes.SETTINGS],
  MATCHMAKING: [AppRoutes.DASHBOARD, AppRoutes.MATCHMAKING],
  REGISTER: [AppRoutes.AUTH, AppRoutes.REGISTER],
  OFFER: [AppRoutes.DEFAULT, AppRoutes.OFFER],
  PLACE: [AppRoutes.DEFAULT, AppRoutes.PLACE],
  FILTERTECH: [AppRoutes.DEFAULT, AppRoutes.FILTERTECH],
  FILTEREXP: [AppRoutes.DEFAULT, AppRoutes.FILTEREXP],
  FILTERMINSAL: [AppRoutes.DEFAULT, AppRoutes.FILTERMINSAL],
  FILTERMAXSAL: [AppRoutes.DEFAULT, AppRoutes.FILTERMAXSAL],
  ADDOFFER: [AppRoutes.ADDOFFER]
};

export const AppRouterUrls = {
  DEFAULT: `/${AppRoutes.DEFAULT}`,
  LOGIN: `/${AppRoutes.AUTH}/${AppRoutes.LOGIN}`,
  BRANDS: `/${AppRoutes.BRANDS}`,
  DASHBOARD: `/${AppRoutes.DASHBOARD}`,
  PROFILE: `/${AppRoutes.DASHBOARD}/${AppRoutes.PROFILE}`,
  PREFERENCES: `/${AppRoutes.DASHBOARD}/${AppRoutes.PREFERENCES}`,
  SETTINGS: `/${AppRoutes.DASHBOARD}/${AppRoutes.SETTINGS}`,
  MATCHMAKING: `/${AppRoutes.DASHBOARD}/${AppRoutes.MATCHMAKING}`,
  REGISTER: `/${AppRoutes.AUTH}/${AppRoutes.REGISTER}`,
  OFFER: `/${AppRoutes.DEFAULT}/${AppRoutes.OFFER}`,
  OFFERID: `/${AppRoutes.DEFAULT}/${AppRoutes.OFFER}/${AppRoutes.OFFERID}`,
  PLACE: `/${AppRoutes.DEFAULT}/${AppRoutes.PLACE} `,
  FILTERTECH: `${AppRoutes.DEFAULT}/${AppRoutes.FILTERTECH} `,
  FILTEREXP: `${AppRoutes.DEFAULT}/${AppRoutes.FILTEREXP} `,
  FILTERMINSAL: `${AppRoutes.DEFAULT}/${AppRoutes.FILTERMINSAL} `,
  FILTERMAXSAL: `${AppRoutes.DEFAULT}/${AppRoutes.FILTERMAXSAL} `,
  ADDOFFER: `/${AppRoutes.ADDOFFER}`
};
