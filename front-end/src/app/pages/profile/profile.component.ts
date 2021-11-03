import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { User } from '../../../_models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User = {
    city: '',
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    userEmail: '',
    userId: 0,
    userRole: '',
    zip: '',
  }

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      const { data }: { data: User } = jwtDecode(token);
      this.user = data;
    }
  }
}
