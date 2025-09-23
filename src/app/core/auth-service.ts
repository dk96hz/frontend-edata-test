import {computed, inject, Injectable, signal} from '@angular/core';
import {Credentials} from './credentials.model';
import {User} from '../features/user-list/user.model';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly _userIsLoggedIn = computed(() => !!this._userData());
  private readonly _userData = signal<User | undefined>(undefined);

  private _authHeader: string | undefined = undefined;

  get userIsLoggedIn() {
    return this._userIsLoggedIn;
  }

  get authHeader() {
    return this._authHeader;
  }

  get username() {
    return this._userData()?.name;
  }

  public logIn(credentials: Credentials) {
    const authHeader = this.getAuthHeader(credentials);
    return this.http.get<User>('http://localhost:8080/login', {headers: {'Authorization': authHeader}})
      .pipe(
        tap(user => {
          this._authHeader = authHeader;
          this._userData.set(user);
        })
      );
  }

  private getAuthHeader(credentials: Credentials) {
    const credentialsBase64 = btoa(`${credentials.username}:${credentials.password}`);
    return `Basic ${credentialsBase64}`;
  }

  public logOut() {
    this._userData.set(undefined);
    this._authHeader = undefined;
  }

  public userHasRole(role: string): boolean {
    return !!this._userData()?.roles.includes(role);
  }
}
