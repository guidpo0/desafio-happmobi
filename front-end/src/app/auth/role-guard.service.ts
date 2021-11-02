import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import User from '../_models/user.interface';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const { expectedRole } = route.data;
    const token = localStorage.getItem('token') || 'not_found';
    const { data: { userRole } }: { data: User } = decode(token);
    if (!this.auth.isAuthenticated() || userRole !== expectedRole) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
