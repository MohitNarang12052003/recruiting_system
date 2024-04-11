import { HttpClient } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HrService {
  constructor(private http: HttpClient) {}
  viewApplications(): Observable<any> {
    return this.http.get<any>('http://localhost:8081/api/viewApplications',{withCredentials:true});
  }

  viewEmployees(): Observable<any> {
    return this.http.get<any>('http://localhost:8081/api/viewEmployees',{withCredentials:true});
  }
  viewVacancies(): Observable<any> {
    return this.http.get<any>('http://localhost:8081/api/viewVacancies',{withCredentials:true});
  }

  postJob(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/api/insertJobs',data,{withCredentials:true});
  }

  getCount():Observable<any>{
    return this.http.get<any>('http://localhost:8081/api/count',{withCredentials:true});
  }

  getSingleApplicant(id:any):Observable<any>{
      console.log("here "+typeof(id));
      return this.http.get<any>(`http://localhost:8081/api/viewSingleApplicant/${id}`,{withCredentials:true});
  }

  getSingleEmployee(id:any):Observable<any>{
    console.log("here "+typeof(id));
    return this.http.get<any>(`http://localhost:8081/api/viewSingleEmployee/${id}`,{withCredentials:true});
}

  updateApplication(id:any,body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8081/api/updateApplication/${id}`,body,{withCredentials:true});
  }

  toggleVacancy(id:number):Observable<any>{
    return this.http.post<any>(`http://localhost:8081/api/toggleVacancy/${id}`,{},{withCredentials:true});
  }

  sendRoundMail(body:any):Observable<any>{
    console.log("called");
    return this.http.post<any>(`http://localhost:8081/api/sendRoundMail`,body,{withCredentials:true});
  }

  sendDocumentMail(body:any):Observable<any>{
    console.log("val ",body["email"]);
    return this.http.post<any>(`http://localhost:8081/api/sendDocumentMail`,body,{withCredentials:true});
  }

  sendEmployeeMail(body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8081/api/sendEmployeeMail`,body,{withCredentials:true});
  }

  getQualificationsOfUser(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:8081/api/getQualificationsOfUser/${id}`,{withCredentials:true});

  }

  getJobHistoryOfUser(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:8081/api/getJobHistoryOfUser/${id}`,{withCredentials:true});

  }



}