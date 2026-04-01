import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  if (window) {
   // window.console.log = () => {}; //Printing console in production | Anubhav Goyal | 04-Jul-2024 |
  }
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()], })
  .catch((err) => console.error(err));
