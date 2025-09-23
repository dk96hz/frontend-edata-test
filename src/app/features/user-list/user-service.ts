import {inject, Injectable} from '@angular/core';
import {User} from './user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/users';

  public addUser(user: User) {
    return this.http.post<User>(this.apiUrl, user);
  }

  public getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
