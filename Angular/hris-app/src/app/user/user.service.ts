import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getSingleJob(id:any):Observable<any>{
    return this.http.get(APP_CONSTANTS.BACKEND_URL + `SingleJob/${id}`, {
      withCredentials: true,
    });
  }
  getDetails(id:any): Observable<any> {
    return this.http.get(APP_CONSTANTS.BACKEND_URL + `singleUserDetails/${id}`, {
      withCredentials: true,
    });
  }

  getUserApplicationDetails(): Observable<any> {
    return this.http.get(APP_CONSTANTS.BACKEND_URL + `userApplicationDetails`, {
      withCredentials: true,
    });
  }

  getQualificationsOfUser(id: any): Observable<any> {
    return this.http.get<any>(
      APP_CONSTANTS.BACKEND_URL + `getQualificationsOfUser/${id}`,
      { withCredentials: true }
    );
  }

  getJobHistoryOfUser(id: any): Observable<any> {
    return this.http.get<any>(
      APP_CONSTANTS.BACKEND_URL + `getJobHistoryOfUser/${id}`,
      { withCredentials: true }
    );
  }
}
