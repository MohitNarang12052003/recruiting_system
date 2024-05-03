import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-offer-letter-details',
  templateUrl: './offer-letter-details.component.html',
  styleUrls: ['./offer-letter-details.component.css']
})
export class OfferLetterDetailsComponent implements OnInit{
offerLetterForm!:FormGroup;
applicantDetails!:any;
id!:any;

show:boolean = false;
display!:any;

openToast(){
  this.show=true;
  console.log(this.display)
}

closeToast() {
  this.show = false;
  this.display=0;
}


constructor(private route:ActivatedRoute,private hrService:HrService){}

ngOnInit(){
  this.getId();
  this.formFn();
}
selectedType = '';
onSelected(value: string): void {
  this.selectedType = value;
}

formFn():void{
  this.offerLetterForm=new FormGroup({
    fullname:new FormControl(),
    job_title:new FormControl(),
    employmentType:new FormControl(),
    salary:new FormControl(),
    email:new FormControl()
  })
}


getId():void{
  this.route.paramMap.subscribe(params=>{
    const id=params.get("id");
    this.id= id;
    console.log(id,typeof(id));

    this.getApplicantDetails();
  })
}

getApplicantDetails():void{
  this.hrService.getSingleApplicant(this.id).subscribe({
    next:(data)=>{
      console.log(data)
      this.applicantDetails=data;

      this.patchValues();
    },
    error:(e)=>{
      console.log(e)
    }
  })
}

patchValues():void{
  this.offerLetterForm.patchValue({
    fullname:this.applicantDetails.full_name,
    email:this.applicantDetails.email
  })
}



submit():void{
  this.offerLetterForm.get('employmentType')?.setValue(this.selectedType);

  this.hrService.offerLetterMail(this.offerLetterForm.value).subscribe({
    next:(data)=>{
      console.log(data)
      this.openToast();
      this.display=1;
    },
    error:(e)=>{
      console.log("e",e)
    }
  })

}



}
