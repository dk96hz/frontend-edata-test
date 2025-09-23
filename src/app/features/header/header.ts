import {Component, inject} from '@angular/core';
import {AuthService} from '../../core/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected get username() {
    return this.authService.username;
  }

  protected logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }
}
