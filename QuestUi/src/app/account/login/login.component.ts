import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Shared/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, GoogleLoginProvider } from '@abacritt/angularx-social-login'; // <-- Add GoogleLoginProvider


@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    GoogleSigninButtonModule,
    SocialLoginModule
  ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toaster = inject(ToastrService);
  private socialAuthService = inject(SocialAuthService);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user && user.idToken) {
        this.auth.googleLogin(user.idToken).subscribe({
          error: (err) => {
            this.toaster.error('Google Login failed.');
            console.error(err);
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const credentials = this.loginForm.getRawValue();
    this.auth.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);

      },
      error: (err) => {
        this.toaster.error('Login failed. Please check your credentials.');
        console.error('Login failed:', err);
      }
    });
  }
}