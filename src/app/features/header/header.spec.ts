import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Header} from './header';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {AuthService} from '../../core/auth-service';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show welcome text with user', () => {
    const fixture = TestBed.createComponent(Header);
    const authService = TestBed.inject(AuthService);

    spyOnProperty(authService, 'username').and.returnValue('User 1');

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.welcome')?.textContent).toContain('Welcome, User 1');
  });

});
