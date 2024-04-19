import { Component } from '@angular/core';
import { HrService } from '../hr.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent {
  nationalHolidays: any;
  today: NgbDateStruct;
  model: NgbDateStruct;
  date: { year: number; month: number };

  constructor(private holidayService: HrService, private calendar: NgbCalendar) {
    this.today = this.calendar.getToday(); // Initialize today's date
    this.model = this.today; // Set model to today's date by default
    this.date = { year: this.today.year, month: this.today.month }; // Initialize date object
  }

  ngOnInit() {
    console.log(this.today);
    // Retrieve national holidays based on the selected month
    this.getMonth();
  }

  getMonth():void {
    this.holidayService.getNationalHolidays(this.date.month).subscribe((data) => {
      this.nationalHolidays = data;
      console.log("!@#",this.nationalHolidays);
    });
  }

  foo(event:any):void {
    console.log(event.next.month);
    this.holidayService.getNationalHolidays(event.next.month).subscribe((data) => {
      this.nationalHolidays = data;
      // console.log(this.nationalHolidays);
    });
  }


}
