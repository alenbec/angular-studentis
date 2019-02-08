import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, JwksValidationHandler, AuthConfig, OAuthStorage } from 'angular-oauth2-oidc'
import { environment } from 'src/environments/environment'

// get auth config from environment variables
const authConfig: AuthConfig = environment.auth

// implementation of custom (local) storage for auth data
const localStore: OAuthStorage = {
  getItem: (key) => localStorage.getItem(`${authConfig.clientId}.${key}`),
  setItem: (key, data) => localStorage.setItem(`${authConfig.clientId}.${key}`, data),
  removeItem: (key) => localStorage.removeItem(`${authConfig.clientId}.${key}`)
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private oauthService: OAuthService, private router : Router) {
    this.oauthService.configure(authConfig)
    this.oauthService.setStorage(localStore)
    this.oauthService.tokenValidationHandler = new JwksValidationHandler()
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
    .then(() => {
      this.oauthService.setupAutomaticSilentRefresh()
    })
  }
  
  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken()
  }

  public login() : void {
      this.oauthService.initImplicitFlow()
  }

  public logout() {
    this.oauthService.logOut();
    this.router.navigate(['/'])
  }

  public user(): object {
    const claims = this.oauthService.getIdentityClaims()
    return claims
  }
}
