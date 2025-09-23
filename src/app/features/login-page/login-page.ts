import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth-service';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinner
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected form!: FormGroup;
  protected showErrorMessage: boolean = false;
  protected loading = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null],
      password: [null]
    });
  }

  protected onSubmit() {
    this.loading = true;
    this.authService.logIn(this.form.value).subscribe({
      next: () => this.router.navigateByUrl("/users"),
      error: () => {
        this.loading = false;
        this.showErrorMessage = true;
      }
    });
  }
}
