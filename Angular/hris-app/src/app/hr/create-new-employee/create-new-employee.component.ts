import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HrService } from '../hr.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-new-employee',
  templateUrl: './create-new-employee.component.html',
  styleUrls: ['./create-new-employee.component.css']
})
export class CreateNewEmployeeComponent implements OnInit{
  applicantDetails!:any;
  id!:string | null;
  newEmployeeForm!:FormGroup;
  deptSelectedType='';

  constructor(private route:ActivatedRoute,private hrService:HrService){}
  ngOnInit(): void {
    this.getId();
    this.newEmployeeFormFn();
  }

  getId():void{
    this.route.paramMap.subscribe(params=>{
      const id=params.get("id");

      this.id=id;


      
    })

    this.getApplicantDetails();
  }

  getApplicantDetails():void{
    this.hrService.getSingleApplicant(this.id).subscribe({
      next:(data)=>{
        this.applicantDetails=data;
        console.log(data)
        this.prefill();
      },
      error:(e)=>{
        console.log("error",e)
      }
    })

    
  }


  newEmployeeFormFn():void{
    this.newEmployeeForm=new FormGroup({
      userid:new FormControl(),
      job_title:new FormControl(),
      salary:new FormControl(),
      department:new FormControl(),
      nemail:new FormControl(),
      oemail:new FormControl(),
      password:new FormControl(),
      date_of_joining:new FormControl(),

    })



  }

  prefill():void{
    this.newEmployeeForm.patchValue({
      userid:this.applicantDetails.user_id,
      job_title:this.applicantDetails.job_title,
      oemail:this.applicantDetails.email

    });

  }


  onDeptSelected(value: string): void {
    this.deptSelectedType = value;
  }


  submit(){
    this.newEmployeeForm.get("department")?.setValue(this.deptSelectedType);
    this.hrService.sendEmployeeMail(this.newEmployeeForm.value).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(e)=>{
        console.log("error ",e);
      }
    })
  }




} 