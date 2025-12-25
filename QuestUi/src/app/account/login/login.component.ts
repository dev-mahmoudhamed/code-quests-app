import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Shared/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, GoogleLoginProvider } from '@abacritt/angularx-social-login'; // <-- Add GoogleLoginProvider
import { KeycloakProfile } from 'keycloak-js';


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
  private authService = inject(AuthService);
  private router = inject(Router);
  private toaster = inject(ToastrService);
  private socialAuthService = inject(SocialAuthService);

  isAuthenticated = false;
  username = '';
  isAdmin = false;
  userProfile?: KeycloakProfile;


  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  async ngOnInit() {
    await this.loadUserData();
  }

  async loadUserData() {
    this.isAuthenticated = await this.authService.isLoggedIn();

    if (this.isAuthenticated) {
      // this.username = this.authService.getUsername();
      // this.isAdmin = this.authService.hasRole('admin');

      // try {
      //   this.userProfile = await this.authService.getProfile();
      // } catch (error) {
      //   console.error('Failed to load user profile', error);
      // }
    }
  }

  async login() {
    await this.authService.login();
  }

  async logout() {
    await this.authService.logout();
  }

  // async manageAccount() {
  //   await this.authService.manageAccount();
  // }
}