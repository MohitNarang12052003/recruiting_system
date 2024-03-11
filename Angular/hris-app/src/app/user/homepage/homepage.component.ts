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
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  
  

}
