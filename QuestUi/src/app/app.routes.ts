import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { MatchesComponent } from './matches/matches.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './Shared/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'matches',
        component: MatchesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'playlist',
        component: PlaylistComponent,
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/matches', pathMatch: 'full' }
];