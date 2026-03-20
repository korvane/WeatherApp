import { Component, inject, Input, input, OnInit, PLATFORM_ID } from '@angular/core';
import { Combine } from '../combine';
import { GetApi } from '../../get-api';
import { City } from 'country-state-city';


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
  placeholder : string = "enter city/state/country";

  @Input() identity! : string; //component identifier for compare.ts observers
    

  weatherSend = inject(Combine);
  rawWeather = inject(GetApi);
  platformID = inject(PLATFORM_ID);

  /**
   * get raw data from API's observable
   * @param cityy city name
   */
  searchCity(cityy : string, callback?: (valid:boolean) => void): void{
    this.rawWeather.getFromAPI(cityy).subscribe(data => {
      if(data == -1 || data == -2){
        if (callback) {
          callback(false);
        }
        return;
      }


      //get data / update html 
      // (Angular's faulty change detection causes HTML text to 
      // update after a second button press due to there being two current-weather.ts instances.)
      this.city = data.name;
      this.temperature = Math.round(data.main.temp);
      this.description = data.weather[0].description;
      this.feelsLike = Math.round(data.main.feels_like);
      this.tempLow = Math.round(data.main.temp_min);
      this.tempHigh = Math.round(data.main.temp_max);
      this.wind = Math.round(data.wind.speed);



      
      //update weather observable in combine.ts
      if(this.identity == "0") {
        this.weatherSend.updateWeather0({
          city : this.city!,
          temperature: this.temperature!,
          wind : this.wind!
        });
      } else if(this.identity=="1"){
        this.weatherSend.updateWeather1({
          city : this.city!,
          temperature: this.temperature!,
          wind : this.wind!
      });
        
      } else {
        console.log("error.");
        console.log(data);
      }

      if (callback) {
        callback(true);
      }

    })
  }


  searchRandom(): void{
    let allCities = City.getAllCities();
    let loc = allCities[Math.floor(Math.random()*allCities.length)].name;
    console.log(loc);
    this.searchCity(loc, (valid) => {
      if(!valid) {
        this.searchRandom();
      }
    });
  }

  /**
   * initialize program with milwaukee
   */
  ngOnInit(): void {
    this.searchCity(this.city);
  }
  
}
