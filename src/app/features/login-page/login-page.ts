import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null],
      password: [null],
    });
  }

  protected onSubmit() {
    this.authService.logIn(this.form.value);
    this.router.navigateByUrl("/users");
  }
}
