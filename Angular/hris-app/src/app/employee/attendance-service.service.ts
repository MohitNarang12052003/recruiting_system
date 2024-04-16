import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  constructor(private http: HttpClient) {}

  markAttendance(employeeId:number):Observable<any> {
    return this.http.post("http://localhost:8081/api/attendance", {employeeId});
  }
}
