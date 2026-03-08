import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WeatherData {
  city:string;
  temperature:number;
  wind:number;
}
@Injectable({
  providedIn: 'root',
})
/**
 * Intermediate class for hosting the current-weather instance component's observables
 */
export class Combine {
  weatherSrc0 = new BehaviorSubject<WeatherData | null>(null) 
  weather0 = this.weatherSrc0.asObservable();

  weatherSrc1 = new BehaviorSubject<WeatherData | null>(null) 
  weather1 = this.weatherSrc1.asObservable();

  /**
   * Update Weather observable - for compare.ts
   * @param data temperature, wind, and name from instance 0 of current-weather.ts
   */
  updateWeather0(data : WeatherData): void {
    this.weatherSrc0.next(data);
  }

  /**
   * Update Weather observable - for compare.ts
   * @param data temperature, wind, and name from instance 1 of current-weather.ts
   */
  updateWeather1(data : WeatherData): void {
    this.weatherSrc1.next(data);
  }
}
