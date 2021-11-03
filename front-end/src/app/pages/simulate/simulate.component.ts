import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/_models/car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Rent } from 'src/_models/rent.model';
    
@Component({
  selector: 'app-simulate',
  templateUrl: './simulate.component.html',
  styleUrls: ['./simulate.component.css']
})
export class SimulateComponent implements OnInit {
  car: Car = {
    carId: 1,
    carModel: '',
    costHour: 0,
    rentAvailable: true,
  };
  carId: number = 0;
  form: FormGroup;
  token: string = '';
  total: number = 0;
  showTotal: boolean = true;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private route:ActivatedRoute,
    public router: Router,
  ) {
    this.form = fb.group({
      rentStart: '',
      rentEnd: '',
    });
    this.form.get('rentStart')?.valueChanges.subscribe((value) => {
      const startTime = new Date(value).getTime();
      const endTime = new Date(this.form.get('rentEnd')?.value).getTime();
      if (startTime < endTime) {
        this.total = (endTime - startTime) / (1000 * 60 * 60) * this.car.costHour;
        this.showTotal = true;
      } else {
        this.showTotal = false;
      }
    });
    this.form.get('rentEnd')?.valueChanges.subscribe((value) => {
      const endTime = new Date(value).getTime();
      const startTime = new Date(this.form.get('rentStart')?.value).getTime();
      if (startTime < endTime) {
        this.total = (endTime - startTime) / (1000 * 60 * 60) * this.car.costHour;
        this.showTotal = true;
      } else {
        this.showTotal = false;
      }
    });
    this.token = localStorage.getItem('token') || 'not-found';
  }

  ngOnInit(): void {
    this.carId = this.route.snapshot.params['carId'];
    this.getCar();
  }

  getCar() {
    this.http.get<Car>(`https://desafio-happmobi-backend.herokuapp.com/cars/${this.carId}`).subscribe(
      (response) => {
        this.car = response;
        if (!this.car.rentAvailable) this.router.navigate(['/cars-available']);
      },
      (error) => this.router.navigate(['/cars-available']),
    );
  }

  submitForm() {
    const data: Rent = {
      ...this.form.value,
      carId: this.carId,
    };
    this.http.post(
      'https://desafio-happmobi-backend.herokuapp.com/rents',
      data,
      { headers: { Authorization: this.token } },
    ).subscribe(
      () => {
        this.router.navigateByUrl('/rents');
      },
      ({ error: { err } }) => alert(err.message),
    );
  }
}
