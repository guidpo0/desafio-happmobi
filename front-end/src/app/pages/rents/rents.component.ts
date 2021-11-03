import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Rent } from 'src/_models/rent.model';
import { User } from 'src/_models/user.model';
import { Car } from 'src/_models/car.model';

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
  cars: Car[] = [
    {
      carId: 1,
      carModel: '',
      costHour: 0,
      rentAvailable: true,
    }
  ];

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const { data }: { data: User } = jwtDecode(token);
      this.user = data;
    }
  }

  ngOnInit(): void {
    this.getUserRents();
    this.getCars();
  }

  getUserRents() {
    this.http.get<{ rents: Rent[]}>('https://desafio-happmobi-db.herokuapp.com/rents').subscribe(
      (response) => {
        this.rents = response.rents.filter((rent) => rent.userId === this.user.userId);
      },
      ({ error: { err } }) => alert(err.message),
    );
  }

  getCars() {
    this.http.get<{ cars: Car[]}>('https://desafio-happmobi-db.herokuapp.com/cars').subscribe(
      (response) => {
        this.cars = response.cars;
      },
      ({ error: { err } }) => alert(err.message),
    );
  }

  getCarModel(carId: number) {
    const carFound: Car = this.cars.find(
      (car) => car.carId === carId,
    ) || { carModel: '', costHour: 0 };
    return carFound.carModel;
  }
}
