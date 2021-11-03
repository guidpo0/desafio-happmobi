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
import { AuthGuardService } from './auth/auth-guard.service';
import { RoleGuardService } from './auth/role-guard.service';
import { LoggedInGuardService } from './auth/logged-in-guard.service';
import { SimulateComponent } from './pages/simulate/simulate.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuardService],
  },
  {
    path: 'register',
    component: CreateUserComponent,
    canActivate: [LoggedInGuardService],
  },
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  { 
    path: 'cars-available',
    component: CarsAvailableComponent,
    canActivate: [AuthGuardService],
  },
  { 
    path: 'rents',
    component: RentsComponent,
    canActivate: [AuthGuardService],
  },
  { 
    path: 'simulate/:carId',
    component: SimulateComponent,
    canActivate: [AuthGuardService],
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuardService, RoleGuardService], 
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
