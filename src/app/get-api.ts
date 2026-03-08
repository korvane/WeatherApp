import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { error } from 'console';

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
    let key = "823c0abcfb6c0e5ab8cbbab764f78353";
      return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`).pipe(
      catchError(error => {
        console.error('API error:', error.message);
        return of(-1);
      })
    );
  }
}