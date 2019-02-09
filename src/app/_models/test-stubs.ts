import { OAuthService, LoginOptions, AuthConfig, OAuthStorage } from 'angular-oauth2-oidc';

var isLoggedIn = false
export const oAuthServiceStub: Partial<OAuthService> = {
  configure: (config: AuthConfig) => { },
  setStorage: (storage: OAuthStorage) => { },
  loadDiscoveryDocumentAndTryLogin: (options?: LoginOptions) => Promise.resolve(true),
  hasValidAccessToken: () => isLoggedIn,
  initImplicitFlow: () => { isLoggedIn = true },
  setupAutomaticSilentRefresh: (params?: object) => { },
  getIdentityClaims: () => {
    return isLoggedIn  ? {
      at_hash: "",
      aud: "",
      azp: "",
      exp: 0,
      family_name: "Bravo",
      given_name: "Johnny",
      iat: 0,
      iss: "https://accounts.google.com",
      jti: "",
      locale: "en-GB",
      name: "Johnny Bravo",
      nonce: "",
      picture: "https://via.placeholder.com/300x300.png?text=Profile+photo",
      sub: ""
    } : { }
  },
  logOut: (noRedirectToLogoutUrl: boolean) => { isLoggedIn = false }
}
