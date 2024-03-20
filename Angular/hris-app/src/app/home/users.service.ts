import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Job } from '../shared/interfaces/job.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  insertUser(data: any): Observable<string> {
    return this.http.post<string>('http://localhost:8081/api/user', data);
  }

  insertQualification(data: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8081/api/qualifications',
      data
    );
  }

  insertJobHistory(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8081/api/jobHistory', data);
  }

  insertadditionalInfo(data: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8081/api/additionalInfo',
      data
    );
  }

  insertPhoto(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8081/api/photo', data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8081/api/login', data);
  }

  uploadFile(file: any, name: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    return this.http.post('http://localhost:8081/api/uploadFile', formData);
  }

  insertApplication(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/api/applyJobs', data, {
      withCredentials: true,
    });
  }

  insertJobs(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/api/insertJobs', data, {
      withCredentials: true,
    });
  }

  fetchJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:8081/api/jobs');
  }

  sendMail(email:string):Observable<any>{
    return this.http.post(`http://localhost:8080/api/sendMail`,{email});
  }
}
