import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../../_models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  form: FormGroup;
  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.form = fb.group({
      userEmail: '',
      userPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      city: '',
      zip: '',
    });
  }
    
  submitForm() {
    const data: User = { ...this.form.value, userRole: 'user' };
    this.http.post<User>(
      'http://localhost:3000/users',
      data,
    ).subscribe(
      (response) => {
        this.router.navigateByUrl('/login');
      },
      ({ error: { err } }) => alert(err.message),
    );
  }
}
