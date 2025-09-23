import {Component, inject, OnInit} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../user-list/user-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [
    TitleCasePipe,
    FormsModule,
    ReactiveFormsModule
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
      this.userService.addUser(this.form.value);
      this.router.navigateByUrl('/users');
    } else {
      this.form.markAsDirty();
    }
  }

  get showErrorMessage() {
    return this.form.invalid && this.submitted;
  }
}
