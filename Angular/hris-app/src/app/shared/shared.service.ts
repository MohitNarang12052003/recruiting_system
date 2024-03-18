import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

  changePwd(body:any):Observable<any>{
     return this.http.post('http://localhost:8080/api/changePwd',body,{withCredentials:true});

  }
}
