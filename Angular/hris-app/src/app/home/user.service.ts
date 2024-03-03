import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Job } from '../shared/interfaces/job.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  insertUser(data: any): Observable<string> {
    return this.http.post<string>('http://localhost:8080/api/user', data);
  }

  insertQualification(data: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/api/qualifications',
      data
    );
  }

  insertJobHistory(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/jobHistory', data);
  }

  insertadditionalInfo(data: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/api/additionalInfo',
      data
    );
  }

  insertPhoto(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/photo', data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/login', data);
  }

  uploadFile(file: any, name: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    return this.http.post('http://localhost:8080/api/uploadFile', formData);
  }

  insertApplication(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/applyJobs', data,{withCredentials:true});
  }

  insertJobs(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/insertJobs', data,{withCredentials:true});
  }

  fetchJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:8080/api/jobs');
  }
}
