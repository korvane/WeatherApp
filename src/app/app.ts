import { Component, signal } from '@angular/core';
import { CurrentWeather } from "./current-weather/current-weather";
import { Compare } from "./compare/compare";

@Component({
  selector: 'app-root',
  imports: [ CurrentWeather, Compare],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('WeatherApp');
}
