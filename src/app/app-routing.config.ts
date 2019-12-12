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
  OFFER: 'offer',
  OFFERID: ':id',
  PLACE: ':place',
  FILTERTECH: ':place/:tech',
  FILTEREXP: ':place/:tech/:exp',
  FILTERMINSAL: ':place/:tech/:exp/:minSal',
  FILTERMAXSAL: ':place/:tech/:exp/:minSal/:maxSal'
};

export const AppRouterLinks = {
  DEFAULT: [AppRoutes.DEFAULT],
  LOGIN: [AppRoutes.AUTH, AppRoutes.LOGIN],
  BRANDS: [AppRoutes.BRANDS],
  REGISTER: [AppRoutes.AUTH, AppRoutes.REGISTER],
  OFFER: [AppRoutes.DEFAULT, AppRoutes.OFFER],
  PLACE: [AppRoutes.DEFAULT, AppRoutes.PLACE],
  FILTERTECH: [AppRoutes.DEFAULT, AppRoutes.FILTERTECH],
  FILTEREXP: [AppRoutes.DEFAULT, AppRoutes.FILTEREXP],
  FILTERMINSAL: [AppRoutes.DEFAULT, AppRoutes.FILTERMINSAL],
  FILTERMAXSAL: [AppRoutes.DEFAULT, AppRoutes.FILTERMAXSAL]
};

export const AppRouterUrls = {
  DEFAULT: `/${AppRoutes.DEFAULT}`,
  LOGIN: `/${AppRoutes.AUTH}/${AppRoutes.LOGIN}`,
  BRANDS: `/${AppRoutes.BRANDS}`,
  REGISTER: `/${AppRoutes.AUTH}/${AppRoutes.REGISTER}`,
  OFFER: `/${AppRoutes.DEFAULT}/${AppRoutes.OFFER}`,
  OFFERID: `/${AppRoutes.DEFAULT}/${AppRoutes.OFFER}/${AppRoutes.OFFERID}`,
  PLACE: `/${AppRoutes.DEFAULT}/${AppRoutes.PLACE} `,
  FILTERTECH: `${AppRoutes.DEFAULT}/${AppRoutes.FILTERTECH} `,
  FILTEREXP: `${AppRoutes.DEFAULT}/${AppRoutes.FILTEREXP} `,
  FILTERMINSAL: `${AppRoutes.DEFAULT}/${AppRoutes.FILTERMINSAL} `,
  FILTERMAXSAL: `${AppRoutes.DEFAULT}/${AppRoutes.FILTERMAXSAL} `
};
