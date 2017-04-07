import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      (<any>navigator).serviceWorker.register(environment.serviceWorkerPath + 'service-worker.js').then(function(reg) {
        reg.onupdatefound = function() {
          const installingWorker = reg.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                if ((<any>navigator).serviceWorker.controller) {
                  console.log('New or updated content is available.');
                } else {
                  console.log('Content is now available offline!');
                }
                break;
              case 'redundant':
                console.error('The installing service worker became redundant.');
                break;
            }
          };
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
    });
  }
}

platformBrowserDynamic().bootstrapModule(AppModule);
