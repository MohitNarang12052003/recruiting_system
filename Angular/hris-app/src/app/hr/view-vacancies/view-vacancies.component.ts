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
  this.hrService.viewVacancies().subscribe((data)=>{
    this.vacancies=data;
  })
  }


}
