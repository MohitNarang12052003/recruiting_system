import { Component, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-single-applicant',
  templateUrl: './single-applicant.component.html',
  styleUrls: ['./single-applicant.component.css']
})
export class SingleApplicantComponent implements OnInit{

  id!:number | null ;
  applicantDetails:any;
  applicantForm!:FormGroup;

 generateForm(){
  this.applicantForm=new FormGroup({
    round_1:new FormControl(),
    round_2:new FormControl(),
    round_3:new FormControl(),
    doc_verification:new FormControl(),
    offer_letter:new FormControl()
  })
 }



constructor(private hrService:HrService,private route:ActivatedRoute,private router:Router){}

ngOnInit(){
  this.getId();
  this.generateForm();
}


getId(){
  this.route.paramMap.subscribe((params:ParamMap | null)=>{
     if(params){
      const idString = params.get('id');
      this.id = idString ? parseInt(idString, 10) : null;

      this.getSingleApplicant();

     }


     console.log(typeof(this.id));

    
  })
}


getSingleApplicant(){
  this.hrService.getSingleApplicant(this.id).subscribe((val)=>{
    console.log(val);
    this.applicantDetails=val;
  })
}

submit(){
  this.hrService.updateApplication(this.id,this.applicantForm.value).subscribe((val)=>{
    console.log(val);
    this.router.navigate([`/ViewApplications`]);

  })
}





}
