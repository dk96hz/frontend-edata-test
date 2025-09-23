import {TestBed} from '@angular/core/testing';
import {App} from './app';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {AuthService} from './core/auth-service';
import {signal} from '@angular/core';

class MockAuthService {
  userIsLoggedIn = signal(true);
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: AuthService, useClass: MockAuthService},
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render header when logged in', async () => {
    const fixture = TestBed.createComponent(App);
    const authService = TestBed.inject(AuthService) as unknown as MockAuthService;

    authService.userIsLoggedIn.set(true);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should not render header when not logged in', async () => {
    const fixture = TestBed.createComponent(App);
    const authService = TestBed.inject(AuthService) as unknown as MockAuthService;

    authService.userIsLoggedIn.set(false);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeFalsy();
  });
});
