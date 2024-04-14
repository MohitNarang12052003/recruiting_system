import { Component, OnInit } from '@angular/core';
import { NationalHolidaysService } from '../national-holidays.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-national-holidays',
  templateUrl: './national-holidays.component.html',
  styleUrls: ['./national-holidays.component.css']
})
export class NationalHolidaysComponent implements OnInit {
  nationalHolidays: any;
  today: NgbDateStruct;
  model: NgbDateStruct;
  date: { year: number; month: number };

  constructor(private holidayService: NationalHolidaysService, private calendar: NgbCalendar) {
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
      // console.log(this.nationalHolidays);
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
