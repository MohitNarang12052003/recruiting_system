import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  
})
export class HomepageComponent implements OnInit{

  userId!:string;
  userDetails!:any;
  usersApplicationDetails!:any;
  degreesData!:any;
  jobHistoryData!:any;
  profile=0;
  progressValue1=50;
  progressValue2=0;
  progressValue3=0;
  msg="Your application is under Process"
view(num:number){
  this.profile=num;
}
  constructor(private cookieService:CookieService,private userService:UserService){}
  ngOnInit(): void {  
    // this.getUserId();
    this.getDetails();
    console.log(this.usersApplicationDetails)
    this.getAllQualificationsOfUser();
    this.getJobHistoryOfUser();
    this.getUserApplicationDetails();
   }

  // getUserId(){
  //   this.userId= this.cookieService.get("userid");
  // }

  getDetails():void{
    this.userService.getDetails().subscribe({
      next:(data)=>{
        console.log(data);
        this.userDetails=data
     
      },
      error:(error)=>{
        console.log("e ",error)
      }
    })
  }

  getUserApplicationDetails(){
    this.userService.getUserApplicationDetails().subscribe({
      next:(data)=>{
        console.log("helllo")
        console.log(data);
        this.usersApplicationDetails=data
       
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }


  getAllQualificationsOfUser(){
    this.userId=this.cookieService.get("user_id");

    this.userService.getQualificationsOfUser(this.userId).subscribe({
      next:(data)=>{
        this.degreesData=data;
        console.log(data);
      },
      error:(e)=>{
        console.log("error ",e);
      }
    })
  }



  getJobHistoryOfUser(){
    this.userId=this.cookieService.get("user_id");

    this.userService.getJobHistoryOfUser(this.userId).subscribe({
      next:(data)=>{
        this.jobHistoryData=data;
        console.log(data);
      },
      error:(e)=>{
        console.log("error ",e);
      }
    })
  }
  
  public currentStep: number = 0;

  public goToNextStep(): void {
    // if (this.validateStep(this.currentStep)) {
      this.currentStep++;
    // }
  }

  public goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // public validateStep(step: number): boolean {
  //   // Implement your validation logic for each step here
  //   switch (step) {
  //     case 1:
  //       return true; // Validation logic for step 1
  //     case 2:
  //       return true; // Validation logic for step 2
  //     case 3:
  //       return true; // Validation logic for step 3
  //     default:
  //       return false;
  //   }
  // }

  viewStatus(num:number,round1:number,round2:number,round3:number){
    console.log(round1);
    this.profile=3;
    if(round1!=-1 && round1==1) {
      this.currentStep++;
      this.msg="Wuhu! You have cleared round 1..Congratulationsss"
      this.progressValue1=100;
      this.progressValue2=50;
    }

    if(round2!=-1 && round2==1) {
      this.currentStep++;
      this.progressValue2=100;
      this.progressValue3=50;
      this.msg="Congratulations!! You have cleared Round 2 as well"
    }
    if(round3!=-1 && round3==1){
      this.currentStep++;
      this.progressValue3=100
      this.msg="Congratulations!! You have cleared All Rounds"
    }
  }
}
