import { Routes } from '@angular/router';
import { oauthGuard } from './guards/oauth.guard';
import { HomeComponent } from './components/home/home.component';
import { SecuredComponent } from './components/secured/secured.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'secured', component: SecuredComponent, canActivate: [oauthGuard] },
  { path: 'error', component: ErrorComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/error' },
];
