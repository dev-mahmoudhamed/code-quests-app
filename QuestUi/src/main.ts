// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

import { routes } from './app/app.routes';
import { authInterceptor } from './app/Shared/interceptors/auth.interceptor';
import { authReducer } from './app/Store/auth.reducer';

// 1️⃣ Define all global providers in a single ApplicationConfig
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr(),
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
