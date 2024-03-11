import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.css']
})
export class SingleEmployeeComponent implements OnInit{
  employeeId!:number;
  employeeData!:any;
  constructor(private route:ActivatedRoute,private hrService:HrService){}
  ngOnInit(){
    this.getEmployeeId();
    this.getEmployeeDetails();
  
  }

  getEmployeeId(){
    this.route.params.subscribe(params => {
      const employeeId = params['id'];
      this.employeeId=employeeId
      console.log(employeeId)
    });
  }

  getEmployeeDetails(){
    this.hrService.getSingleEmployee(this.employeeId).subscribe({
      next:(data)=>{
        console.log(data);
        this.employeeData=data
      },
      error:(error)=>{
        console.log(error)
      }
    })
    
  }

  
}
