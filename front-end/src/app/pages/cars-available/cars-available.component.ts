import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/_models/car.model';


@Component({
  selector: 'app-cars-available',
  templateUrl: './cars-available.component.html',
  styleUrls: ['./cars-available.component.css']
})
export class CarsAvailableComponent implements OnInit {
  cars: Car[];

  constructor(private http: HttpClient) {
    this.cars = [
      {
        carId: 1,
        carModel: '',
        costHour: 0,
        rentAvailable: true
      }
    ]
  }

  ngOnInit(): void {
    this.getAvailableCars();
  }

  getAvailableCars() {
    this.http.get<{ cars: Car[]}>('http://localhost:3000/cars').subscribe(
      (response) => {
        this.cars = response.cars.filter((car) => car.rentAvailable);
      },
      ({ error: { err } }) => alert(err.message),
    );
  }
}
