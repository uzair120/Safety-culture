export const CONSTANTS = {
  ENVIRONMENT: {
    TEST: 'test',
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
  },
  LANGUAGE: 'en',
  BASE_ROUTE: '/iauditor/api/v1/',

  HEADERS: {
    X_REQUEST_ID: 'x-request-id',
    X_LANG: 'x-lang',
  },

  DEV_SERVER: process.env.DEV_SERVER
    ? process.env.DEV_SERVER
    : 'https://dev.iauditor.me',
  STAGE_SERVER: process.env.STAGE_SERVER
    ? process.env.STAGE_SERVER
    : 'https://stage.iauditor.me',
  PROD_SERVER: process.env.PROD_SERVER
    ? process.env.PROD_SERVER
    : 'https://prod.iauditor.me',
  LOCAL: process.env.LOCAL ? process.env.LOCAL : 'http://localhost:3000',
};
