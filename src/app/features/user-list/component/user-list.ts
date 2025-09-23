import {Component, inject, OnInit} from '@angular/core';
import {User} from '../user.model';
import {FaIconComponent, IconDefinition} from '@fortawesome/angular-fontawesome';
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../user-service';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../core/auth-service';

@Component({
  selector: 'app-user-list',
  imports: [
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  protected readonly comparators: { [key: string]: (a: User, b: User) => number } = {
    'name': (a: User, b: User) => a.name.localeCompare(b.name),
    'id': (a: User, b: User) => a.id - b.id
  };

  private currentSortField!: 'name' | 'id';
  private currentSortDirection = 1;

  protected users: User[] = [];

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  protected sortByField(field: 'name' | 'id') {
    if (this.currentSortField !== field) {
      this.currentSortField = field;
      this.currentSortDirection = 1;
    } else {
      this.currentSortDirection *= -1;
    }

    this.users.sort((a: User, b: User) => this.currentSortDirection * this.comparators[field](a, b));
  }

  protected getSortIcon(field: string): IconDefinition {
    if (this.currentSortField !== field) {
      return faSort;
    }
    return this.currentSortDirection === 1 ? faSortUp : faSortDown;
  }

  protected get userIsAdmin() {
    return this.authService.userHasRole('admin');
  }
}
