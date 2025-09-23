import {Routes} from '@angular/router';
import {UserList} from './features/user-list/component/user-list';
import {LoginPage} from './features/login-page/login-page';
import {UserForm} from './features/user-form/user-form';
import {authGuard} from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'users',
    component: UserList,
    canActivate: [authGuard]
  },
  {
    path: 'user-form',
    component: UserForm,
    canActivate: [authGuard],
    data: {roles: ['admin']}
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: "**",
    redirectTo: "users"
  }
];
