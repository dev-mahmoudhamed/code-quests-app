import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterDto } from '../../Models/registerDto';
import { AuthService } from '../../Shared/Services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: this.passwordMatchValidator
  });

  private passwordMatchValidator(form: any) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const registerDto: RegisterDto = this.registerForm.getRawValue();

    this.auth.register(registerDto).subscribe({
      next: () => {
        // this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (error) => {
        // this.snackBar.open(`Registration failed: ${error.message}`, 'Close', {
        //   duration: 5000,
        //   panelClass: ['error-snackbar']
        // });
      }
    });
  }
}