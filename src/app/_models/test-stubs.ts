import { OAuthService } from 'angular-oauth2-oidc';

export const oAuthServiceStub: Partial<OAuthService> = {
  hasValidAccessToken: () => true,
  initImplicitFlow: () => { },
  getIdentityClaims: () => {
    return {
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
      nonce: "XME7CbqQ02m2J45JWt6Dhy5hK6FCQ4KO5Dwa1bmY",
      picture: "https://via.placeholder.com/300x300.png?text=Profile+photo",
      sub: ""
    }
  }
}