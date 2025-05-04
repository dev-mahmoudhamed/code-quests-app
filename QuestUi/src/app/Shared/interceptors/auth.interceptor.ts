import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token) {
        // Check if token is expired
        const tokenExpiration = authService.getTokenExpiration();
        if (tokenExpiration && new Date() > tokenExpiration) {
            authService.logout(); // Clear the expired token
            return throwError(() => new HttpErrorResponse({
                error: 'Token expired',
                status: 401
            }));
        }

        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });

        return next(authReq).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    authService.logout();
                }
                return throwError(() => error);
            })
        );
    }
    return next(req);
};