import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserList} from './user-list';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {AuthService} from '../../../core/auth-service';
import {provideRouter} from '@angular/router';
import {UserService} from '../user-service';
import {of} from 'rxjs';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render render add button when admin', () => {
    const fixture = TestBed.createComponent(UserList);
    const authService = TestBed.inject(AuthService);

    spyOn(authService, 'userHasRole').withArgs('admin').and.returnValue(true);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Add User');
  });

  it('should not render add button when not admin', () => {
    const fixture = TestBed.createComponent(UserList);
    const authService = TestBed.inject(AuthService);

    spyOn(authService, 'userHasRole').withArgs('admin').and.returnValue(false);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).toBeFalsy();
  });

  it('should not show loading when users loaded', async () => {
    const fixture = TestBed.createComponent(UserList);
    const userService = TestBed.inject(UserService);

    spyOn(userService, 'getUsers').and.returnValue(of([]));

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-loading-spinner')).toBeFalsy();
  });

  it('should show loading when users not loaded', async () => {
    const fixture = TestBed.createComponent(UserList);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-loading-spinner')).toBeTruthy();
  });
});
