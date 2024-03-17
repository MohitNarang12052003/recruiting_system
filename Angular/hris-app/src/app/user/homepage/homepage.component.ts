import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  userId!:string;
  userDetails!:any;
  usersApplicationDetails!:any;
  degreesData!:any;
  jobHistoryData!:any;

  constructor(private cookieService:CookieService,private userService:UserService){}
  ngOnInit(): void {  
    // this.getUserId();
    this.getDetails();
   }

  // getUserId(){
  //   this.userId= this.cookieService.get("userid");
  // }

  getDetails():void{
    this.userService.getDetails().subscribe({
      next:(data)=>{
        console.log(data);
        this.userDetails=data
        this.getUserApplicationDetails();
      },
      error:(error)=>{
        console.log("e ",error)
      }
    })
  }

  getUserApplicationDetails(){
    this.userService.getUserApplicationDetails().subscribe({
      next:(data)=>{
        console.log(data);
        this.usersApplicationDetails=data
        this.getAllQualificationsOfUser();
        this.getJobHistoryOfUser();
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }


  getAllQualificationsOfUser(){
    this.userId=this.userDetails.user_id;

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
    this.userId=this.userDetails.user_id;

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
  
  

}
