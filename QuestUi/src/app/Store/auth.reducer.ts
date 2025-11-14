import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
    user: any | null;
    token: string | null;
    isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
    user: null,
    token: null,
    isLoggedIn: false,
};

export const authFeatureKey = 'auth';

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.loginSuccess, (state, { user, token }) => ({
        ...state,
        user,
        token,
        isLoggedIn: true,
    })),
    on(AuthActions.loadUserFromToken, (state, { user, token }) => ({
        ...state,
        user,
        token,
        isLoggedIn: !!user,
    })),
    on(AuthActions.logout, () => ({ ...initialAuthState }))
);
