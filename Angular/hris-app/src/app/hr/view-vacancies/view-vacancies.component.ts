import { Component } from '@angular/core';
import { HrService } from '../hr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-vacancies',
  templateUrl: './view-vacancies.component.html',
  styleUrls: ['./view-vacancies.component.css']
})
export class ViewVacanciesComponent {
  vacancies!:any[];

  constructor(private hrService:HrService,private router:Router){

  }

  ngOnInit(): void {
  this.getData();

  }


  toggleVacancy(j_id : number):void{
    
    this.hrService.toggleVacancy(j_id).subscribe({
      next:(data)=>{
        console.log(data)
        this.getData();
      },
      error:(error)=>{
        console.log("error ",error)
      }
    })
  }


  getData():void{
    this.hrService.viewVacancies().subscribe((data)=>{
      console.log(data)
      
      this.vacancies=data;
    })
  }


}
