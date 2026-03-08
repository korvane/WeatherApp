import { Component, inject, OnInit } from '@angular/core';
import { Combine } from '../combine';

@Component({
  selector: 'app-compare',
  imports: [],
  templateUrl: './compare.html',
  styleUrl: './compare.css',
})
export class Compare implements OnInit{
  weather0 : any;
  weather1 : any;
  tempComparison! : string;
  windComparison! : string;

  weatherReceive = inject(Combine);

  /**
   * subscribe to receive data from the two current-weather.ts instances
   */
  ngOnInit(): void {
    this.weatherReceive.weather0.subscribe(data => {
      this.weather0 = data;
      this.updateComparison();
    })
    this.weatherReceive.weather1.subscribe(data => {
      this.weather1 = data;
      this.updateComparison();
    })
  }

  /**
   * Update comparison text variables.
   */
  updateComparison(): void {
    if(this.weather0 && this.weather1){
      //TEMPERATURE
      let tempDiff = this.weather0.temperature - this.weather1.temperature;
      let tmp: string;
      let tmp2: string;

      if (tempDiff > 0) {
        tmp = "hotter";
      } else if (tempDiff < 0) {
        tmp = "colder";
        tempDiff = -tempDiff;
      } else {
        tmp = "just as";
      }

      tmp2 = this.weather0.temperature < 50 ? "cold" : "hot";

      if (tmp === "just as") {
        this.tempComparison = `${this.weather0.city} is ${tmp} ${tmp2} as ${this.weather1.city}.`;
      } else {
        this.tempComparison = `${this.weather0.city} is ${tempDiff}° ${tmp} than ${this.weather1.city}.`;
      }

      //WIND
      let windDiff = this.weather0.wind - this.weather1.wind;
      if(windDiff > 0) {
        this.windComparison = this.weather0.city + " is windier than " + this.weather1.city + ".";
      }
      else if(windDiff < 0) {
        this.windComparison = this.weather1.city + " is windier than " + this.weather0.city + ".";
      }
      else {
        this.windComparison = this.weather0.city + " is just as windy as " + this.weather1.city +".";
      }
    }
  }
}
