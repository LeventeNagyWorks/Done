import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { Tasks } from './pages/tasks/tasks';
import { Playground } from './pages/playground/playground';
import { Auth } from './pages/auth/auth';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'tasks', component: Tasks },
  { path: 'playground', component: Playground },
  { path: 'profile', component: Profile },
  { path: 'login', component: Auth, data: { formType: 'login' } },
  {
    path: 'registration',
    component: Auth,
    data: { formType: 'registration' },
  },
  { path: '**', redirectTo: 'home' },
];
