// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // authApiUrl: 'https://localhost:5001/api/',
  // postApiUrl: 'https://localhost:8443/post/',
  // accountApiUrl: 'https://localhost:8444/account/'
  authApiUrl: 'https://20.76.199.117/authentication/api/',
  postApiUrl: 'https://20.76.199.117/post/post/',
  accountApiUrl: 'https://20.76.199.117/account/account/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
