// // app.config.ts
// import { ApplicationConfig, provideZoneChangeDetection, provideRouter } from '@angular/core';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideToastr } from 'ngx-toastr';
// import { provideStore } from '@ngrx/store';

// import { routes } from './app.routes';
// import { authInterceptor } from './Shared/interceptors/auth.interceptor';
// import { authReducer } from './Store/auth.reducer';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideHttpClient(withInterceptors([authInterceptor])),
//     provideAnimations(),
//     provideToastr(),
//     provideStore({ auth: authReducer }),
//   ]
// };
