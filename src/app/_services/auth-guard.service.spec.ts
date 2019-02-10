import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { oAuthServiceStub } from '../_models/test-stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { Location } from '@angular/common';

describe('AuthGuardService', () => {

  let service: AuthGuardService
  let authService: AuthService
  let location: Location

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent },
          { path: 'login', component: LoginComponent },
        ])
      ],
      providers: [
        { provide: OAuthService, useValue: oAuthServiceStub },
        AuthService
      ],
      declarations: [
        HomeComponent,
        LoginComponent
      ]
    })

    service = TestBed.get(AuthGuardService);
    authService = TestBed.get(AuthService)
    location = TestBed.get(Location)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to login page if not logged in', fakeAsync(() => {
    authService.logout()
    expect(service.canActivate()).toBe(false)
    tick(0)
    expect(location.path()).toBe('/login')
  }))

  it('shouldn\'t redirect to login page if logged in', fakeAsync(() => {
    authService.login()
    expect(service.canActivate()).toBe(true)
    tick(0)
    expect(location.path()).toBe('')
  }))
});
