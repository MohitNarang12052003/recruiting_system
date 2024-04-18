import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getDetails():Observable<any>{
    return this.http.get(`http://localhost:8083/api/singleUserDetails`,{withCredentials:true})
  }

  getUserApplicationDetails():Observable<any>{
    return this.http.get(`http://localhost:8083/api/userApplicationDetails`,{withCredentials:true})
  }

  getQualificationsOfUser(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:8083/api/getQualificationsOfUser/${id}`,{withCredentials:true});

  }


  
  getJobHistoryOfUser(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:8083/api/getJobHistoryOfUser/${id}`,{withCredentials:true});

  }
  

}
