import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { RegisterDto } from '../../Models/registerDto';
import { environment } from '../../../environments/environment';
import { LoginDto } from '../../Models/loginDto';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../Store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authTokenKey = 'auth_token';

    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store<any>) {
    }

    register(registerDto: RegisterDto) {
        return this.http.post(`${environment.apiUrl}/auth/register`, registerDto);
    }

    login(credentials: LoginDto) {
        return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, credentials)
            .pipe(
                tap(response => {
                    this.storeToken(response.token);
                    const user = this.decodeToken(response.token);
                    // dispatch login success to store
                    this.store.dispatch(AuthActions.loginSuccess({ user, token: response.token }));
                    this.router.navigate(['/matches']);
                })
            );
    }

    googleLogin(idToken: string) {
        return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/google-login`, { idToken })
            .pipe(
                tap(response => {
                    this.storeToken(response.token);
                    const user = this.decodeToken(response.token);
                    this.store.dispatch(AuthActions.loginSuccess({ user, token: response.token }));
                    this.router.navigate(['/matches']);
                })
            );
    }

    logout() {
        localStorage.removeItem(this.authTokenKey);
        this.store.dispatch(AuthActions.logout());
        window.location.reload();
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