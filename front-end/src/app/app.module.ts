import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { RoleGuardService } from './auth/role-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CarsAvailableComponent } from './pages/cars-available/cars-available.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RentsComponent } from './pages/rents/rents.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    CreateUserComponent,
    ProfileComponent,
    CarsAvailableComponent,
    NotFoundComponent,
    AdminComponent,
    RentsComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    AuthService,
    JwtHelperService,
    RoleGuardService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
