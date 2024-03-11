import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/home/user.service';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css']
})
export class ViewApplicantsComponent implements OnInit {
  applications!:any[];
  success!:boolean;

  constructor(private hrService:HrService,private router:Router){

  }

  ngOnInit(): void {
  this.hrService.viewApplications().subscribe((data)=>{
    console.log(data);
     
      this.applications=data;
    
  })
  }

}