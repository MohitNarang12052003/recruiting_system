import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Job } from '../shared/interfaces/job.interface';
import { APP_CONSTANTS } from '../shared/constants/app.constants';
import { dept } from '../shared/interfaces/departments.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}


  alreadyExists(username:string,email:string):Observable<any>{
    return this.http.get<any>(APP_CONSTANTS.BACKEND_URL + `alreadyExists/${username}/${email}`);
  }

  insertUser(data: any): Observable<string> {
    return this.http.post<string>(APP_CONSTANTS.BACKEND_URL + 'user', data);
  }

  insertQualification(data: any): Observable<any> {
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL +
      'qualifications',
      data
    );
  }

  insertJobHistory(data: any): Observable<any> {
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL +'jobHistory', data);
  }

  insertadditionalInfo(data: any): Observable<any> {
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL +
      'additionalInfo',
      data
    );
  }

  insertPhoto(data: any): Observable<any> {
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL +'photo', data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL +'login', data);
  }

  uploadFile(file: any, name: string,userid:string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('userid',userid);
    return this.http.post(APP_CONSTANTS.BACKEND_URL +'uploadFile', formData);
  }

  insertApplication(data: any): Observable<any> {
    return this.http.post(APP_CONSTANTS.BACKEND_URL +'applyJobs', data, {
      withCredentials: true,
    });
  }

  insertJobs(data: any): Observable<any> {
    return this.http.post(APP_CONSTANTS.BACKEND_URL +'insertJobs', data, {
      withCredentials: true,
    });
  }

  fetchJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(APP_CONSTANTS.BACKEND_URL +'jobs');
  }

  sendMail(email:string):Observable<any>{
    return this.http.post(APP_CONSTANTS.BACKEND_URL +'sendMail',{email});
  }

  fetchDepts(): Observable<dept[]> {
    return this.http.get<dept[]>(APP_CONSTANTS.BACKEND_URL +'depts');
  }

  sendAnything(data:any):Observable<any>{
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL +'sendAnything', data);

  }

  insertDocuments(data:any):Observable<any>{
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL+'insertDocuments',data, {
      withCredentials: true,
    });
  }


  active:number=1;
  setActive():void{
    this.active=this.active+1;
  }
  
}
