import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const keycloak = inject(Keycloak);

    // Keycloak handles the token state. Just check if it exists.
    if (keycloak.authenticated && keycloak.token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${keycloak.token}`
            }
        });
        return next(authReq);
    }

    return next(req);
};