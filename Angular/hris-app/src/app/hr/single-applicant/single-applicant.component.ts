import { Component, Input, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-single-applicant',
  templateUrl: './single-applicant.component.html',
  styleUrls: ['./single-applicant.component.css']
})
export class SingleApplicantComponent implements OnInit{

  id!:number | null ;
  applicantDetails:any;
  applicantForm!:FormGroup;
  degreesData!:any;
  userId!:any;
  jobHistoryData!:any;
  jobHistoryDataBool!:boolean;
  degreesDataBool!:boolean;
  doc:number=0;





  

 generateForm(){
  this.applicantForm=new FormGroup({
    round_1:new FormControl(),
    round_2:new FormControl(),
    round_3:new FormControl(),
    doc_verification:new FormControl(),
    offer_letter:new FormControl()
  })

  this.getId();

 
 }



constructor(private hrService:HrService,private route:ActivatedRoute,private router:Router,private cookieService:CookieService){}

ngOnInit(){

  // this.getId();
  this.generateForm();
  
}

patchForm(){
  console.log("pf")
  this.applicantForm.patchValue({
    round_1:this.applicantDetails.round_1,
    round_2:this.applicantDetails.round_2,
    round_3:this.applicantDetails.round_3,
    doc_verification:this.applicantDetails.doc_verification,
    offer_letter:this.applicantDetails.offer_letter,

  })
  console.log("values patched",this.applicantForm.get("round_1")?.value,this.applicantDetails.round_1)
}

getId(){
  this.route.paramMap.subscribe((params:ParamMap | null)=>{
     if(params){
      console.log(params);
      const idString = params.get('id');
      this.id = idString ? parseInt(idString, 10) : null;
      this.cookieService.set('app_id',params.get('id')!);
      this.getSingleApplicant();
      

     }


     console.log(typeof(this.id));

    
  })
}

getSingleApplicant(){
  this.hrService.getSingleApplicant(this.id).subscribe((val)=>{
    console.log(val);
    this.applicantDetails=val;
    this.userId=val['user_id'];
    console.log(this.userId);
    this.patchForm();
    this.getAllQualificationsOfApplicant();
    this.getJobHistoryOfApplicant();
    this.checkDocuments();
  })
}


checkDocuments(){
  console.log("userid"+" "+this.userId);
  this.hrService.checkDocuments(this.userId).subscribe((val)=>{
    console.log("value"+val);
    this.doc=val;
    console.log(this.doc);
  })
}
// round1Val:any;
// round1Value(value:string){
//   console.log("r1",value)
//   this.round1Val=value;
// }
// round2Val:any;
// round2Value(value:string){
//   console.log("r2",value)
//   this.round2Val=value;
// }
// round3Val:any;
// round3Value(value:string){
//   console.log("r3",value)
//   this.round3Val=value;
// }
// docVerVal:any;
// docVerValue(value:string){
//   this.docVerVal=value;
// }
// offerLetterVal:any;
// offerLetterValue(value:string){
//   this.offerLetterVal=value;
// }

submit(){
  // this.applicantForm.get("round_1")?.setValue(this.round1Val);
  // this.applicantForm.get("round_2")?.setValue(this.round2Val);
  // this.applicantForm.get("round_3")?.setValue(this.round3Val);
  // this.applicantForm.get("doc_verification")?.setValue(this.docVerVal);
  // this.applicantForm.get("offer_letter")?.setValue(this.offerLetterVal);

  // console.log("here",this.applicantForm.get("round_1")?.value)

  this.hrService.updateApplication(this.id,this.applicantForm.value).subscribe((val)=>{
    
    console.log(val);
    this.router.navigate(['/ViewApplications']);

  })
}

onSelected(value: string,round:string): void {
  this.applicantForm.get(round)?.setValue(value);
}
sendDocumentMail():void{

  let myMap: { [key: string]: any }={};
  myMap["email"]=this.applicantDetails.email;
  myMap["username"]=this.applicantDetails.username;

  this.hrService.sendDocumentMail(myMap).subscribe({
    next:(data)=>{
      console.log("ahuja")
      console.log(data);
    },
    error:(e)=>{
      console.log("error",e);
    }
  })
}


getAllQualificationsOfApplicant(){
  this.userId=this.applicantDetails.user_id;

  this.hrService.getQualificationsOfUser(this.userId).subscribe({
    next:(data)=>{
      if(data.length>0){
        this.degreesDataBool=true;
      }
      this.degreesData=data;
      console.log(data);
    },
    error:(e)=>{
      console.log("error ",e);
    }
  })
}


getJobHistoryOfApplicant(){
  this.userId=this.applicantDetails.user_id;

  this.hrService.getJobHistoryOfUser(this.userId).subscribe({
    next:(data)=>{
      if(data.length>0){
        this.jobHistoryDataBool=true;
      }
      this.jobHistoryData=data;
      console.log("jh",data);
    },
    error:(e)=>{
      console.log("error ",e);
      this.router.navigate(['/unauthorized'])
    }
  })
}

}