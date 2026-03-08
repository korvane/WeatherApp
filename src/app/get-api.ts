import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class GetApi {
  http = inject(HttpClient);
  //dataMap = new Map<String, String>();
  

  //get parameters from api
  //input: City - name
  //returns: observable - (to be parsed)
  getFromAPI(city: string): Observable<any> {
    let key = environment.API_KEY;
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`)
      .pipe(
      catchError((error : HttpErrorResponse) => {
        if(error.status == 404 || error.status == 400){
          console.log('Type in a valid city!');
          return of(-1);
        } else {
          console.log('API error.')
          return of(-2);
        }
        
      })
    );
  }
}