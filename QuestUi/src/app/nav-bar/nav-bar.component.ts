import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Shared/Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);

  userName: string = '';
  private userSub?: Subscription;

  ngOnInit(): void {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.userName = user?.name?.split(' ')[0] || '';
    });
  }

  isLoggedIn$ = this.authService.isLoggedIn$;

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
