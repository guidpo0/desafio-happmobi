import { Component, Input, OnChanges } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { NavbarLink } from '../../../_models/navbar-link.model';
import { User } from '../../../_models/user.model';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import {
  NavbarLinksAdminLogged,
  NavbarLinksNotLogged,
  NavbarLinksUserLogged,
} from '../../../actions/navbar-links.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges {
  @Input() links: NavbarLink[] = [{ link: '', text: '' }];
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(
    private store: Store<AppState>,
    public auth: AuthService,
    private router: Router,  
  ) {
    this.setNavbarLinks();
  }

  setNavbarLinks(): void {
    if (this.auth.isAuthenticated()) {
      this.isLoggedIn = true;
      const token = localStorage.getItem('token') || 'not_found';
      const { data: { userRole, firstName }, data }: { data: User } = jwtDecode(token);
      this.userName = firstName;
      userRole === 'admin'
        ? this.store.dispatch(new NavbarLinksAdminLogged()) : this.store.dispatch(new NavbarLinksUserLogged());
    } else {
      this.isLoggedIn = false;
      this.store.dispatch(new NavbarLinksNotLogged());
    }
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.store.dispatch(new NavbarLinksNotLogged());
    this.router.navigate(['/']);
  }

  ngOnChanges(): void {
    this.setNavbarLinks();
  }
}
