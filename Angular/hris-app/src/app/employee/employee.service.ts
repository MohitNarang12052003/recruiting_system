import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) {   }

  getDetails(id:any):Observable<any>{
    return this.http.get(APP_CONSTANTS.BACKEND_URL+`viewSingleEmployee/${id}`,{withCredentials:true})
  }

  getQualificationsOfUser(id:any):Observable<any>{
    return this.http.get<any>(APP_CONSTANTS.BACKEND_URL+`getQualificationsOfUser/${id}`,{withCredentials:true});

  }


  getJobHistoryOfUser(id:any):Observable<any>{
    return this.http.get<any>(APP_CONSTANTS.BACKEND_URL+`getJobHistoryOfUser/${id}`,{withCredentials:true});

  }
}
