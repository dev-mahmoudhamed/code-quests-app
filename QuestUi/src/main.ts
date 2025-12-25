// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { GoogleLoginProvider, } from '@abacritt/angularx-social-login';

import { routes } from './app/app.routes';
import { authInterceptor } from './app/Shared/interceptors/auth.interceptor';
import { authReducer } from './app/Store/auth.reducer';

////////////////

import {
  provideKeycloak,
  includeBearerTokenInterceptor
} from 'keycloak-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),


    provideKeycloak({
      config: {
        url: 'http://localhost:9090',
        realm: 'CodeQuest',
        clientId: 'angular-app'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      },
      // Optional: Enable auto-refreshing of tokens
      features: [
        // withAutoRefreshToken() 
      ]
    }),

    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ auth: authReducer }),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '339174469556-hishhce1sgg9d93na5fbav75rd451uti.apps.googleusercontent.com'
            )
          }
        ]
      }
    }
  ]
};

// 2️⃣ Bootstrap the app using this single config
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
