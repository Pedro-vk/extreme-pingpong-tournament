import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      (<any>navigator).serviceWorker.register('service-worker.js').then(function(reg) {
        reg.onupdatefound = function() {
          var installingWorker = reg.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                if ((<any>navigator).serviceWorker.controller) {
                  console.log('[SW] New or updated content is available.');
                  window.location.reload(true);
                } else {
                  console.log('[SW] Content is now available offline!');
                }
                break;
              case 'redundant':
                console.error('[SW] The installing servicbe worker became redundant.');
                break;
            }
          };
        };
      }).catch(function(e) {
        console.error('[SW] Error during service worker registration:', e);
      });
    });
  }
}

platformBrowserDynamic().bootstrapModule(AppModule);
