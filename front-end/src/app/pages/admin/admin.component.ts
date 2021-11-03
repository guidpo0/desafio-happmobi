import { Component, OnInit } from '@angular/core';
import { Car } from 'src/_models/car.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cars: Car[] = [
    {
      carId: 1,
      carModel: '',
      costHour: 0,
      rentAvailable: true,
    }
  ];
  form: FormGroup;
  token: string;
  editing: boolean = false;
  editingCarId: number = 0;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.form = fb.group({
      carModel: '',
      costHour: '',
    });
    this.token = localStorage.getItem('token') || 'not-found';
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.http.get<{ cars: Car[]}>('https://desafio-happmobi-db.herokuapp.com/cars').subscribe(
      (response) => {
        this.cars = response.cars;
      },
      ({ error: { err } }) => alert(err.message),
    );
  }

  submitForm() {
    const data: Car = { ...this.form.value, rentAvailable: true };
    if (this.editing) {
      this.http.put<Car>(
        `https://desafio-happmobi-db.herokuapp.com/cars/${this.editingCarId}`,
        data,
        { headers: { Authorization: this.token } },
      ).subscribe(
        (response) => {
          this.cars = this.cars.map((car) => (
            car.carId === response.carId ? response : car
          ));
          this.editing = false;
        },
        ({ error: { err } }) => alert(err.message),
      );
    } else {
      this.http.post<Car>(
        'https://desafio-happmobi-db.herokuapp.com/cars',
        data,
        { headers: { Authorization: this.token } },
      ).subscribe(
        (response) => {
          this.cars = [...this.cars, response];
        },
        ({ error: { err } }) => alert(err.message),
      );
    }
  }

  editCar(carToEdit: Car) {
    this.editing = true;
    this.editingCarId = carToEdit.carId || 0;
    this.form.setValue({
      carModel: carToEdit.carModel,
      costHour: carToEdit.costHour,
    });
  }

  removeCar(id: number | undefined) {
    this.http.delete<Car>(
      `https://desafio-happmobi-db.herokuapp.com/cars/${id}`,
      { headers: { Authorization: this.token } },
    ).subscribe(
      () => {
        this.cars = this.cars.filter((car) => car.carId !== id);
      },
      ({ error: { err } }) => alert(err.message),
    );
  }
}
