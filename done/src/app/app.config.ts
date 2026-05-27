import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';
import {
  remixCornerDownRightLine,
  remixHome2Fill,
  remixLayoutMasonryFill,
  remixListCheck3,
  remixMailAddLine,
  remixSettings4Fill,
  remixUserFill,
} from '@ng-icons/remixicon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIcons({
      remixHome2Fill,
      remixListCheck3,
      remixUserFill,
      remixMailAddLine,
      remixLayoutMasonryFill,
      remixCornerDownRightLine,
      remixSettings4Fill,
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
