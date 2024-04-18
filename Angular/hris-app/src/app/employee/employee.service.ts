import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) {   }

  getDetails(id:any):Observable<any>{
    return this.http.get(APP_CONSTANTS.BACKEND_URL+`viewSingleEmployee/${id}`,{withCredentials:true})
  }

  getQualificationsOfUser(id:any):Observable<any>{
    return this.http.get<any>(APP_CONSTANTS.BACKEND_URL+`getQualificationsOfUser/${id}`,{withCredentials:true});

  }


  getJobHistoryOfUser(id:any):Observable<any>{
    return this.http.get<any>(APP_CONSTANTS.BACKEND_URL+`getJobHistoryOfUser/${id}`,{withCredentials:true});

  }

  
  singleGoalData(id:number):Observable<any>{
    return  this.http.get<any>(`http://localhost:8081/api/singleGoalData/${id}`,{withCredentials:true});
  }


  updateGoal(body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8081/api/updateGoal`,body,{withCredentials:true});
  }

  getSkills():Observable<any>{
    return this.http.get<any>(`http://localhost:8083/api/getSkills`,{withCredentials:true});
  }

  addSkill(body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8083/api/addSkill`,body,{withCredentials:true});
  }

  fetchGoals():Observable<any>{
    return this.http.get<any>(`http://localhost:8083/api/fetchGoals`,{withCredentials:true});
  }

  addGoal(body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8083/api/addGoal`,body,{withCredentials:true});
  }

  deleteGoal(id:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8083/api/deleteGoal`,id,{withCredentials:true});
  }

ApplyLeave(data: any): Observable<any> {
  return this.http.post('http://localhost:8083/api/applyLeave',data,{withCredentials:true});
}


getNationalHolidays(month:number):Observable<any> {
  return this.http.post("http://localhost:8083/api/getHolidays", { month });
}
 //nidhi

 fetchAnnouncement():Observable<any>{
  return this.http.get<any>(`http://localhost:8081/api/announcement`,{withCredentials:true});

 }
getTotalLeavesCount(id:any):Observable<any>{
  return this.http.get<any>(`http://localhost:8081/api/totalLeavesCount/${id}`,{withCredentials:true});

}
getCategoryWiseCount(id:number):Observable<any>{
  return this.http.get<any>(`http://localhost:8081/api/CategoryWiseCount/${id}`,{withCredentials:true});
}
}


