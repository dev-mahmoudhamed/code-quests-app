import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Shared/Services/auth.service';
import { Subscription, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser, selectIsLoggedIn } from '../Store/auth.selectors';

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
  private store = inject(Store);

  userName$?: Observable<string>;
  private userSub?: Subscription;

  ngOnInit(): void {
    this.userName$ = this.store.select(selectUser).pipe(
      map((user: any) => user?.name?.split(' ')[0] || '')
    );
  }

  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
