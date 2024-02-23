import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HrService {
  constructor(private http: HttpClient) {}
  viewApplications(): Observable<any> {
    return this.http.get<any>('http://localhost:8082/api/viewApplications');
  }

  postJob(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/api/insertJobs',data);
  }
}
