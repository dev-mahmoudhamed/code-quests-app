import { NgModule } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  imports: [SocialLoginModule],
  providers: [
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
      } as SocialAuthServiceConfig
    }
  ]
})
export class SocialLoginConfigModule { }
