import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HrService } from '../hr.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.css']
})
export class SingleEmployeeComponent implements OnInit{
  employeeId!:number;
  employeeData!:any;
  degreesData!:any;
  jobHistoryData!:any;
  userId!:any;
  degreesDataBool!:boolean;
  jobHistoryDataBool!:boolean;
  

  constructor(private route:ActivatedRoute,private hrService:HrService){}
  ngOnInit(){
    this.getEmployeeId();
    
  
  }

  getEmployeeId(){
    this.route.params.subscribe(params => {
      const employeeId = params['id'];
      this.employeeId=employeeId
      console.log(employeeId)
    });

    this.getEmployeeDetails();
  }

  getEmployeeDetails(){
    this.hrService.getSingleEmployee(this.employeeId).subscribe({
      next:(data)=>{
        console.log(data);
        this.employeeData=data
        this.getAllQualificationsOfEmployee();
        this.getJobHistoryOfEmployee();



      },
      error:(error)=>{
        console.log(error)
      }
    })

    
    
  }


  getAllQualificationsOfEmployee(){
    this.userId=this.employeeData.user_id;

    this.hrService.getQualificationsOfUser(this.userId).subscribe({
      next:(data)=>{
        this.degreesData=data;
        if(data.length>0){
          this.degreesDataBool=true;
        }
        console.log(data);
      },
      error:(e)=>{
        console.log("error ",e);
      }
    })
  }


  getJobHistoryOfEmployee(){
    this.userId=this.employeeData.user_id;

    this.hrService.getJobHistoryOfUser(this.userId).subscribe({
      next:(data)=>{
        this.jobHistoryData=data;
        if(data.length>0){
          this.jobHistoryDataBool=true;
        }
        console.log(data);
      },
      error:(e)=>{
        console.log("error ",e);
      }
    })
  }

  

  
}
