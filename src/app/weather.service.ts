import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient:HttpClient) { }
  //call the API to get current weather based on zipcode
  getZipInfo(zipcode:string):Observable<any>{
    const API_key='5a4b2d457ecbef9eb2a71e480b947604';
    const url='http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+'&appid='+API_key;
    return this.httpClient.get<any>(url);

  };
  //calls the API to get forecast based on zipcode
  getForcastInfo(zipcode:string):Observable<any>{
    const API_key='5a4b2d457ecbef9eb2a71e480b947604';
    const url='http://api.openweathermap.org/data/2.5/forecast/?zip='+zipcode+'&appid='+API_key;
    return this.httpClient.get<any>(url);

  };
}

