import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: any; token: string }>()
);

export const logout = createAction('[Auth] Logout');

export const loadUserFromToken = createAction(
    '[Auth] Load From Token',
    props<{ user: any; token: string }>()
);
