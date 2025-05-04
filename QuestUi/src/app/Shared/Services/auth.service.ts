import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { RegisterDto } from '../../Models/registerDto';
import { environment } from '../../../environments/environment.development';
import { LoginDto } from '../../Models/loginDto';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authTokenKey = 'auth_token';
    private currentUserSubject = new BehaviorSubject<any>(null);

    private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router) {
    }

    register(registerDto: RegisterDto) {
        return this.http.post(`${environment.apiUrl}/auth/register`, registerDto);
    }

    login(credentials: LoginDto) {
        return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, credentials)
            .pipe(
                tap(response => {
                    this.storeToken(response.token);
                    this.currentUserSubject.next(this.decodeToken(response.token));
                    this.isLoggedInSubject.next(this.isAuthenticated());
                    this.router.navigate(['/matches']);
                })
            );
    }

    logout() {
        localStorage.removeItem(this.authTokenKey);
        this.isLoggedInSubject.next(this.isAuthenticated());
        this.currentUserSubject.next(null);
        window.location.reload();
        //   this.router.navigate(['/test']);
    }

    get currentUserId(): number | null {
        const token = this.getToken();
        if (!token) return null;
        const payload = this.decodeToken(token);
        return payload?.userId || null;
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    private storeToken(token: string): void {
        localStorage.setItem(this.authTokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.authTokenKey);
    }

    private decodeToken(token: string): any {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }

    getTokenExpiration(): Date | null {
        const token = this.getToken();
        if (!token) return null;

        const payload = this.decodeToken(token);
        if (!payload?.exp) return null;

        // exp is in seconds, convert to millisseconds
        return new Date(payload.exp * 1000);
    }
}