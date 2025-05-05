import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Shared/Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  userName!: string;
  constructor() {
  }

  ngOnInit(): void {
    this.userName = (this.authService.currentUser?.name.toString()).split(' ')[0];
  }

  isLoggedIn$ = this.authService.isLoggedIn$;

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
