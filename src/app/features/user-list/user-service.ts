import {Injectable} from '@angular/core';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userList: User[] = [{
    id: 1,
    name: "Felipe",
    roles: [
      "standard",
      "admin"
    ]
  }, {
    id: 2,
    name: "Roberto",
    roles: [
      "standard"
    ]
  }, {
    id: 3,
    name: "Maria",
    roles: [
      "standard"
    ]
  }, {
    id: 4,
    name: "Rebeca",
    roles: [
      "admin"
    ]
  }];

  public addUser(user: User) {
    this.simulateBackend(user);
    this.userList.push(user);
  }

  private simulateBackend(user: User) {
    if (user.roles.length < 1) {
      user.roles = ["standard"];
    }
    user.id = this.userList.reduce((maxId: number, user: User) => Math.max(maxId, user.id), 0) + 1;

  }

  public getUsers(): User[] {
    return this.userList;
  }
}
