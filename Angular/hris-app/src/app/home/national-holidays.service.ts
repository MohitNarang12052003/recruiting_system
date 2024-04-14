import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NationalHolidaysService {

  constructor(private http: HttpClient) { }

  getNationalHolidays(month:number):Observable<any> {
    return this.http.post("http://localhost:8081/api/getHolidays", { month });
  }
}
