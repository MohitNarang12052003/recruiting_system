import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) {   }

  getDetails(id:any):Observable<any>{
    return this.http.get(`http://localhost:8081/api/viewSingleEmployee/${id}`,{withCredentials:true})
  }

  getQualificationsOfUser(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:8081/api/getQualificationsOfUser/${id}`,{withCredentials:true});

  }


  getJobHistoryOfUser(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:8081/api/getJobHistoryOfUser/${id}`,{withCredentials:true});

  }

  getSkills():Observable<any>{
    return this.http.get<any>(`http://localhost:8081/api/getSkills`,{withCredentials:true});
  }

  addSkill(body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8081/api/addSkill`,body,{withCredentials:true});
  }

  fetchGoals():Observable<any>{
    return this.http.get<any>(`http://localhost:8081/api/fetchGoals`,{withCredentials:true});
  }

  addGoal(body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8081/api/addGoal`,body,{withCredentials:true});
  }

  deleteGoal(id:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8081/api/deleteGoal`,id,{withCredentials:true});
  }

  singleGoalData(id:number):Observable<any>{
    return  this.http.get<any>(`http://localhost:8081/api/singleGoalData/${id}`,{withCredentials:true});
  }


  updateGoal(body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8081/api/updateGoal`,body,{withCredentials:true});
  }
}
