import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Rent } from 'src/_models/rent.model';
import { User } from 'src/_models/user.model';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css']
})
export class RentsComponent implements OnInit {
  rents: Rent[] = [{
    carId: 1,
    rentId: 1,
    userId: 0,
    rentStart: '',
    rentEnd: '',
    total: 0,
  }];
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

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const { data }: { data: User } = jwtDecode(token);
      this.user = data;
    }
  }

  ngOnInit(): void {
    this.getUserRents();
  }

  getUserRents() {
    this.http.get<{ rents: Rent[]}>('http://localhost:3000/rents').subscribe(
      (response) => {
        this.rents = response.rents.filter((rent) => rent.userId === this.user.userId);
        console.log(this.rents)
      },
      ({ error: { err } }) => alert(err.message),
    );
  }
}
