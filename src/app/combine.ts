import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WeatherData {
  //identity:string;
  city:string;
  temperature:number;
  wind:number;
}
@Injectable({
  providedIn: 'root',
})
export class Combine {
  weatherSrc0 = new BehaviorSubject<WeatherData | null>(null) 
  weather0 = this.weatherSrc0.asObservable();

  weatherSrc1 = new BehaviorSubject<WeatherData | null>(null) 
  weather1 = this.weatherSrc1.asObservable();

  updateWeather0(data : WeatherData) {
    this.weatherSrc0.next(data);
  }
  updateWeather1(data : WeatherData) {
    this.weatherSrc1.next(data);
  }
}
