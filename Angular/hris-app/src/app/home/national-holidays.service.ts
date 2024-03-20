import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NationalHolidaysService {

  constructor(private http: HttpClient) { }

  getNationalHolidays():Observable<any> {
    return this.http.post("http://localhost:8080/api/getHolidays", { "month": "10" });
  }
}
