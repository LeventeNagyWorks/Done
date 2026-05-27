import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { Tasks } from './pages/tasks/tasks';
import { Playground } from './pages/playground/playground';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'tasks', component: Tasks },
  {
    path: 'playground',
    component: Playground,
    children: [
      { path: 'button', component: Playground },
      { path: 'dropdown', component: Playground },
    ],
  },
  { path: 'profile', component: Profile },
  { path: '**', redirectTo: 'home' },
];
