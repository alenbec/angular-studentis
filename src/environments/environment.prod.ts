export const environment = {
  production: true,
  apiSimulationDelay: 250,
  auth: {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: '535451098130-lq4ql5ghmhra3dpi73b1qhedt5dei8td.apps.googleusercontent.com',
    strictDiscoveryDocumentValidation: false,
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html'
  }
};
