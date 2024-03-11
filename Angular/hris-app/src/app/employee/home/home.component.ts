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

  constructor(private cookieService:CookieService,private employeeService:EmployeeService){}
  ngOnInit(){
    this.employeeId=this.cookieService.get("employee_id")    
    this.getDetails();
  }

  getDetails(){
    this.employeeService.getDetails(this.employeeId).subscribe({
      next:(data)=>{
        this.employeeData=data
      },
      error:(error)=>{
        console.log("error ",error)
      }
    })
  }

}
