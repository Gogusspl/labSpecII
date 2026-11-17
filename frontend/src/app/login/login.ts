import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);

  showPassword = false;
  loading = false;
  success = false;
  error = '';

  form = this.fb.nonNullable.group({
    login: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get login() { return this.form.controls.login; }
  get password() { return this.form.controls.password; }

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    // tymczasowo, do czasu podpięcia backendu
    setTimeout(() => {
      const { login, password } = this.form.getRawValue();
      if (login === 'jan' && password === 'Haslo123!') {
        this.success = true;
      } else {
        this.error = 'Nieprawidłowy login lub hasło';
      }
      this.loading = false;
    }, 800);
  }
}