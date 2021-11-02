import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { CarsAvailableComponent } from './pages/cars-available/cars-available.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RentsComponent } from './pages/rents/rents.component';
import {
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';
import { 
  RoleGuardService as RoleGuard 
} from './auth/role-guard.service';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: CreateUserComponent },
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'cars-available',
    component: CarsAvailableComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'rents',
    component: RentsComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'admin'
    },
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
