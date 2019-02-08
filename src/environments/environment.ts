// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiSimulationDelay: 250,
  auth: {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: '535451098130-lq4ql5ghmhra3dpi73b1qhedt5dei8td.apps.googleusercontent.com',
    strictDiscoveryDocumentValidation: false,
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
