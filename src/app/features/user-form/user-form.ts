import {Component, inject, OnInit} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../user-list/user-service';
import {Router} from '@angular/router';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';

@Component({
  selector: 'app-user-form',
  imports: [
    TitleCasePipe,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinner
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected form!: FormGroup;
  private submitted = false;

  protected errorMessage: string | undefined;
  protected loading = false;

  protected readonly roles: string[] = [
    "standard",
    "admin"
  ];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      roles: [[]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.userService.addUser(this.form.value).subscribe({
        next: () => this.router.navigateByUrl('/users'),
        error: error => {
          this.errorMessage = error.error.errorMessage ?? 'There has benn an error';
          this.loading = false;
        }
      });
    } else {
      this.form.markAsDirty();
    }
  }

  get showFormErrorMessage() {
    return this.form.invalid && this.submitted;
  }

  get showErrorMessage() {
    return this.errorMessage && !this.loading;
  }
}
