import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit{
  nationalHolidays: any;
  today: NgbDateStruct;
  model: NgbDateStruct;
  date: { year: number; month: number };

  constructor(private holidayService: EmployeeService, private calendar: NgbCalendar) {
    this.today = this.calendar.getToday(); // Initialize today's date
    this.model = this.today; // Set model to today's date by default
    this.date = { year: this.today.year, month: this.today.month }; // Initialize date object
  }

  ngOnInit() {
    // Retrieve national holidays based on the selected month
    this.getMonth();
  }

  getMonth():void {
    this.holidayService.getNationalHolidays(this.date.month).subscribe((data) => {
      this.nationalHolidays = data;
    });
  }

  getNationalHolidaysFn(event:any):void {
    this.holidayService.getNationalHolidays(event.next.month).subscribe((data) => {
      this.nationalHolidays = data;
    });
  }

}
