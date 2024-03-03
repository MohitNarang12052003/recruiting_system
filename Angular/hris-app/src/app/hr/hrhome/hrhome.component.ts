import { Component, OnInit, inject } from '@angular/core';
import {
  NgbCalendar,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-hrhome',
  templateUrl: './hrhome.component.html',

  styleUrls: ['./hrhome.component.css'],
})
export class HrhomeComponent implements OnInit{
  empCount!:number;
  userCount!:number;
  applicantsCount!:number;
  vacanciesCount!:number;

  constructor(private hrService:HrService){}
  ngOnInit(){
    this.getCounts()
  }

  getCounts():void{
    this.hrService.getCount().subscribe((val)=>{
      console.log(val);
      this.empCount=val.emp_count;
      this.userCount=val.user_count;
      this.vacanciesCount=val.vacancies_count;
      this.applicantsCount=val.applicant_count;
      
    })

  }

  today = inject(NgbCalendar).getToday();

  model: NgbDateStruct | undefined=this.today;
  date: { year: number; month: number } | undefined;


}
