import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { oAuthServiceStub } from '../_models/test-stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router
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
        { provide: OAuthService, useValue: oAuthServiceStub }
      ],
      declarations: [
        HomeComponent,
        LoginComponent
      ]
    })
    service = TestBed.get(AuthService)
    router = TestBed.get(Router)
    location = TestBed.get(Location)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shouldn\'t be authenticated', () => {
    service.logout()
    expect(service.isAuthenticated()).toBe(false)
  })

  it('should be authenticated after login', () => {
    service.login()
    expect(service.isAuthenticated()).toBe(true)
  })

  it('shouldn\'t be authenticated after logout', () => {
    service.login()
    service.logout()
    expect(service.isAuthenticated()).toBe(false)
  })

  it('should redirect to home after logout', fakeAsync(() => {
    router.initialNavigation()
    router.navigate(['/login'])
    tick(0)
    service.login()
    service.logout()
    tick(0)
    expect(location.path()).toBe('/')
    expect(service.isAuthenticated()).toBe(false)
  }))

  it('should return empty claims when logged out', () => {
    let claimsCount = Object.keys(service.user()).length
    expect(claimsCount).toBe(0)
  })

  it('should return Johnny Bravo claims when logged in', () => {
    service.login()
    let user = service.user()
    let claimsCount = Object.keys(user).length
    expect(claimsCount).toBeGreaterThan(0)
    expect(user['name']).toBe('Johnny Bravo')
  })
});
