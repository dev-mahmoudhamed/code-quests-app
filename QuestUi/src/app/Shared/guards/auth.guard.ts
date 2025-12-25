import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';

export const AuthGuard: CanActivateFn = async (route, state) => {
    const keycloak = inject(Keycloak);

    if (keycloak.authenticated) {
        return true;
    }

    // Redirect to Keycloak login
    await keycloak.login({
        redirectUri: window.location.origin + state.url
    });
    return false;
};