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
    return this.http.post<string>('http://localhost:8082/api/user', data);
  }

  insertQualification(data: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8082/api/qualifications',
      data
    );
  }

  insertJobHistory(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8082/api/jobHistory', data);
  }

  insertadditionalInfo(data: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8082/api/additionalInfo',
      data
    );
  }

  insertPhoto(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8082/api/photo', data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8082/api/login', data);
  }

  uploadFile(file: any, name: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    return this.http.post('http://localhost:8082/api/uploadFile', formData);
  }

  insertApplication(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/api/applyJobs', data);
  }

  insertJobs(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/api/insertJobs', data);
  }

  fetchJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:8082/api/jobs');
  }
}
