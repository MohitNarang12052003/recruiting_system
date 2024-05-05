import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getDetails(id: any): Observable<any> {
    return this.http.get(
      APP_CONSTANTS.BACKEND_URL + `viewSingleEmployee/${id}`,
      { withCredentials: true }
    );
  }

  getQualificationsOfUser(id: any): Observable<any> {
    return this.http.get<any>(
      APP_CONSTANTS.BACKEND_URL + `getQualificationsOfUser/${id}`,
      { withCredentials: true }
    );
  }

  getJobHistoryOfUser(id: any): Observable<any> {
    return this.http.get<any>(
      APP_CONSTANTS.BACKEND_URL + `getJobHistoryOfUser/${id}`,
      { withCredentials: true }
    );
  }

  singleGoalData(id: number): Observable<any> {
    return this.http.get<any>(
      APP_CONSTANTS.BACKEND_URL + `singleGoalData/${id}`,
      { withCredentials: true }
    );
  }

  updateGoal(body: any): Observable<any> {
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL + `updateGoal`, body, {
      withCredentials: true,
    });
  }

  getSkills(): Observable<any> {
    return this.http.get<any>(APP_CONSTANTS.BACKEND_URL + `getSkills`, {
      withCredentials: true,
    });
  }

  addSkill(body: any): Observable<any> {
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL + `addSkill`, body, {
      withCredentials: true,
    });
  }

  fetchGoals(): Observable<any> {
    return this.http.get<any>(APP_CONSTANTS.BACKEND_URL + `fetchGoals`, {
      withCredentials: true,
    });
  }

  addGoal(body: any): Observable<any> {
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL + `addGoal`, body, {
      withCredentials: true,
    });
  }

  deleteGoal(id: any): Observable<any> {
    return this.http.post<any>(APP_CONSTANTS.BACKEND_URL + `deleteGoal`, id, {
      withCredentials: true,
    });
  }

  ApplyLeave(data: any): Observable<any> {
    return this.http.post(APP_CONSTANTS.BACKEND_URL + 'applyLeave', data, {
      withCredentials: true,
    });
  }

  getNationalHolidays(month: number): Observable<any> {
    return this.http.post(APP_CONSTANTS.BACKEND_URL + 'getHolidays', { month });
  }

  fetchAnnouncement(): Observable<any> {
    return this.http.get<any>(APP_CONSTANTS.BACKEND_URL + `announcement`, {
      withCredentials: true,
    });
  }
  getTotalLeavesCount(id: any): Observable<any> {
    return this.http.get<any>(
      APP_CONSTANTS.BACKEND_URL + `totalLeavesCount/${id}`,
      { withCredentials: true }
    );
  }
  getCategoryWiseCount(id: number): Observable<any> {
    return this.http.get<any>(
      APP_CONSTANTS.BACKEND_URL + `CategoryWiseCount/${id}`,
      { withCredentials: true }
    );
  }
}
