import {computed, inject, Injectable, signal} from '@angular/core';
import {Credentials} from './credentials.model';
import {User} from '../features/user-list/user.model';
import {UserService} from '../features/user-list/user-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _userIsLoggedIn = computed(() => !!this._userData());
  private readonly _userData = signal<User | undefined>(undefined);
  private readonly userService = inject(UserService);

  get userIsLoggedIn() {
    return this._userIsLoggedIn;
  }

  get username() {
    return this._userData()?.name;
  }

  public logIn(credentials: Credentials) {
    const user = this.userService.getUsers().find(user => user.name.toLowerCase() === credentials.username.toLowerCase());
    this._userData.set(user);
  }

  public logOut() {
    this._userData.set(undefined);
  }

  public userHasRole(role: string): boolean {
    return !!this._userData()?.roles.includes(role);
  }
}
