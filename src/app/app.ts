import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './core/auth-service';
import {Header} from './features/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly authService = inject(AuthService);
  protected readonly userIsLoggedIn = this.authService.userIsLoggedIn;
}
