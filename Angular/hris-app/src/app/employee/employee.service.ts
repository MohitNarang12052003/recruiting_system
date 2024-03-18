import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) {   }

  getDetails(id:any):Observable<any>{
    return this.http.get(`http://localhost:8080/api/viewSingleEmployee/${id}`,{withCredentials:true})
  }

  getQualificationsOfUser(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/getQualificationsOfUser/${id}`,{withCredentials:true});

  }


  getJobHistoryOfUser(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/getJobHistoryOfUser/${id}`,{withCredentials:true});

  }
}
