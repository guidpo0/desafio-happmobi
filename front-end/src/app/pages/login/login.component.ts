import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    ) {
      this.form = fb.group({
        userEmail: '',
        userPassword: ''
      });
    }
    
    submitForm() {
      console.log(this.form.value);
      this.http.post<{ token: string }>('http://localhost:3000/login', this.form.value)
    .subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/cars-available');
      },
      ({ error: { err } }) => alert(err.message),
    );
  }
}
