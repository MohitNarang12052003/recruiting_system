import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  constructor(private http: HttpClient) {}

  markAttendance():Observable<any> {
    return this.http.post("http://localhost:8080/api/attendance", {});
  }
}
