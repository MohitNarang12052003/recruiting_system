import { Component, OnInit } from '@angular/core';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  employeeId!:string;
  employeeData!:any;
  degreesData!:any;
  userId!:any;
  jobHistoryData!:any;
  

  constructor(private cookieService:CookieService,private employeeService:EmployeeService){}
  ngOnInit(){
    this.employeeId=this.cookieService.get("employee_id")    
    this.getDetails();
  }

  getDetails(){
    this.employeeService.getDetails(this.employeeId).subscribe({
      next:(data)=>{
        this.employeeData=data
        this.getAllQualificationsOfEmployee();
        this.getJobHistoryOfEmployee();
      },
      error:(error)=>{
        console.log("error ",error)
      }
    })
  }

  getAllQualificationsOfEmployee(){
    this.userId=this.employeeData.user_id;

    this.employeeService.getQualificationsOfUser(this.userId).subscribe({
      next:(data)=>{
        this.degreesData=data;
        console.log(data);
      },
      error:(e)=>{
        console.log("error ",e);
      }
    })
  }


  getJobHistoryOfEmployee(){
    this.userId=this.employeeData.user_id;

    this.employeeService.getJobHistoryOfUser(this.userId).subscribe({
      next:(data)=>{
        this.jobHistoryData=data;
        console.log(data);
      },
      error:(e)=>{
        console.log("error ",e);
      }
    })
  }
  

}
