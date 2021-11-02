import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      userEmail: '',
      userPassword: ''
    });
  }

  submitForm() {
    console.log(this.form.value);
    this.http.post('http://localhost:3000/login', this.form.value).subscribe(
      (response) => console.log(response),
      ({ error: { err: { err } } }) => alert(err.message),
    )
  }
}
