import { Component, inject, Input, input, OnInit, PLATFORM_ID } from '@angular/core';
import { GetApi } from '../get-api';
import { Combine } from '../combine';

@Component({
  selector: 'app-current-weather',
  imports: [],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.css',
})
export class CurrentWeather implements OnInit{
  cityInput: string = '';
  city : string = 'Milwaukee';
  temperature? : number;
  description? : string;
  feelsLike? : number;
  tempLow? : number;
  tempHigh? : number;
  wind? : number;

  @Input() identity! : string; //component identifier for to sessionStorage
    

  weatherSend = inject(Combine);
  rawWeather = inject(GetApi);
  platformID = inject(PLATFORM_ID);

  //input: city name
  searchCity(cityy : string) {
    this.rawWeather.getFromAPI(cityy).subscribe(data => {

      if(data != -1) { 
        //get data
        this.city = data.name;
        this.temperature = Math.round(data.main.temp);
        this.description = data.weather[0].description;
        this.feelsLike = Math.round(data.main.feels_like);
        this.tempLow = Math.round(data.main.temp_min);
        this.tempHigh = Math.round(data.main.temp_max);
        this.wind = Math.round(data.wind.speed);

        
        //update weather for combine.ts
        if(this.identity == "0") {
          this.weatherSend.updateWeather0({
            //identity : this.identity!,
            city : this.city!,
            temperature: this.temperature!,
            wind : this.wind!
          });
        } else {
          this.weatherSend.updateWeather1({
            //identity : this.identity!,
            city : this.city!,
            temperature: this.temperature!,
            wind : this.wind!
          });
        }

        
      }
      else {
        //error message
      }
    })
  }


  //initialize program with milwaukee
  ngOnInit(): void {
    this.searchCity(this.city);
  }
  
  
}
