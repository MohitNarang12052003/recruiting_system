import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HrService } from '../hr.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-next-round-email',
  templateUrl: './next-round-email.component.html',
  styleUrls: ['./next-round-email.component.css']
})
export class NextRoundEmailComponent {
  id!:any;
  applicantDetails!:any;

  nextRoundForm!:FormGroup;

  constructor(private route:ActivatedRoute,private hrService:HrService){}
  ngOnInit(){
    this.getId();
    this.nextRoundDetails();
  }

  nextRoundDetails():void{
    this.nextRoundForm=new FormGroup({
      email:new FormControl(),
      uname:new FormControl(),
      number:new FormControl(),
      date:new FormControl(),
      place:new FormControl(),
      time:new FormControl()

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
        this.applicantDetails=data;
        console.log(data)
      },
      error:(e)=>{
        console.log("error",e)
      }
    })
  }


  submit(){
    this.nextRoundForm.patchValue({
      email:this.applicantDetails.email,
      uname:this.applicantDetails.username
    })

    this.hrService.sendRoundMail(this.nextRoundForm.value).subscribe({
      next:(data)=>{
        console.log(data);

      },
      error:(e)=>{
        console.log("error",e);
      }
    })

  }



}
