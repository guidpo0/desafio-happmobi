import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { NavbarLink } from '../../../_models/navbar-link.model';
import User from '../../../_models/user.model';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  links: NavbarLink[] = [{ link: '', text: '' }];
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(public auth: AuthService) {
    this.setNavbarLinks();
  }

  setNavbarLinks(): void {
    if (this.auth.isAuthenticated()) {
      this.isLoggedIn = true;
      this.links = [
        { link: '/', text: 'Home' },
        { link: '/cars-available', text: 'Carros Disponíveis' },
        { link: '/rents', text: 'Meus Aluguéis' },
        { link: '/profile', text: 'Perfil' },
      ];
      const token = localStorage.getItem('token') || 'not_found';
      const { data: { userRole, firstName } }: { data: User } = jwtDecode(token);
      this.userName = firstName;
      if (userRole === 'admin') {
        this.links = [
          { link: '/admin', text: 'Admin' },
          ...this.links,
        ]      
      } 
    } else {
      this.links = [
        { link: '/', text: 'Home' },
        { link: '/login', text: 'Login' },
        { link: '/register', text: 'Criar Conta' },
      ];
    }
  }
}
