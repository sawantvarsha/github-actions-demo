import { NgModule } from '@angular/core';
import {
  AuthModule, LogLevel, StsConfigHttpLoader,
  StsConfigLoader,
} from 'angular-auth-oidc-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { IAppConfig } from '../models/app-config.model';
import { environment } from 'src/environments/environment';

export const httpLoaderFactory = (httpClient: HttpClient) => {
  const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

  const config$ = httpClient
    .get<any>(
      'assets/configs' + (environment.production ? '.prod' : '') + '.json',
      { headers: headerOptions }
    )
    .pipe(
      map((customConfig: IAppConfig) => {
        return {
          authority: customConfig.authUrl,//environment.lssURL,
          redirectUrl: customConfig.redirectUrl + customConfig.hostedAppName,
          postLogoutRedirectUri:
            customConfig.redirectUrl + customConfig.hostedAppName,
          clientId: 'eu',
          scope: 'openid profile offline_access api',
          responseType: 'code',
          silentRenew: true,
          useRefreshToken: true,
          silentRenewTimeoutInSeconds: 300,
          tokenRefreshInSeconds: 5,
          refreshTokenRetryInSeconds: 5,
          renewTimeBeforeTokenExpiresInSeconds: 30,
          ignoreNonceAfterRefresh: true,
          logLevel: LogLevel.None,
          customParamsRefreshTokenRequest: {
            scope: 'openid profile offline_access api',
          },
        };
      })
    );

  return new StsConfigHttpLoader(config$);
};
@NgModule({
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule { }
