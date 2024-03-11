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
    return this.http.get(`http://localhost:8080/api/singleUserDetails`,{withCredentials:true})
  }

  getUserApplicationDetails():Observable<any>{
    return this.http.get(`http://localhost:8080/api/userApplicationDetails`,{withCredentials:true})
  }
  

}
