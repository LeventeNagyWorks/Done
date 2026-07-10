import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';
import {
  remixCornerDownRightLine,
  remixFileList2Line,
  remixHome2Line,
  remixLayoutMasonryFill,
  remixListCheck3,
  remixMailAddLine,
  remixMindMap,
  remixPencilLine,
  remixSettings4Line,
  remixUserFill,
  remixFullscreenLine,
  remixFullscreenExitLine,
  remixArtboardLine,
  remixCalendarTodoFill,
  remixDraggable,
  remixMore2Line,
  remixCalendarLine,
} from '@ng-icons/remixicon';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIcons({
      remixHome2Line,
      remixListCheck3,
      remixUserFill,
      remixMailAddLine,
      remixLayoutMasonryFill,
      remixCornerDownRightLine,
      remixSettings4Line,
      remixFileList2Line,
      remixMindMap,
      remixPencilLine,
      remixFullscreenLine,
      remixFullscreenExitLine,
      remixArtboardLine,
      remixCalendarTodoFill,
      remixDraggable,
      remixMore2Line,
      remixCalendarLine,
    }),
    providePrimeNG({
      theme: { preset: Aura },
      ripple: true,
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
  ],
};
