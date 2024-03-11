import { Component } from '@angular/core';
import { HrService } from '../hr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent {
  employees!:any[];

  constructor(private hrService:HrService,private router:Router){

  }

  ngOnInit(): void {
  this.getEmployeeDetails();
  }

  getEmployeeDetails():void{
    this.hrService.viewEmployees().subscribe((data)=>{
      console.log(data);
      this.employees=data;
    })
  }
  

}
