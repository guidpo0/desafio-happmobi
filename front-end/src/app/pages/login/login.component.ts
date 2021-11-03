import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>,
    public auth: AuthService
  ) {
      this.form = fb.group({
        userEmail: '',
        userPassword: ''
      });
  }
    
  submitForm() {
    this.http.post<{ token: string }>(
      'https://desafio-happmobi-db.herokuapp.com/login',
      this.form.value,
    ).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        const { data: { userRole } }: { data: User } = jwtDecode(response.token);
        if (userRole === 'admin') {
          this.store.dispatch(new NavbarLinksAdminLogged())
          this.router.navigateByUrl('/admin');
        } else {
          this.store.dispatch(new NavbarLinksUserLogged());
          this.router.navigateByUrl('/cars-available');
        }
      },
      ({ error: { err } }) => alert(err.message),
    );
  }
}
