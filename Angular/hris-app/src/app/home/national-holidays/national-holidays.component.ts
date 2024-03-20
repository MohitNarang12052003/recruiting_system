import { Component } from '@angular/core';
import { NationalHolidaysService } from '../national-holidays.service';

@Component({
  selector: 'app-national-holidays',
  templateUrl: './national-holidays.component.html',
  styleUrls: ['./national-holidays.component.css']
})
export class NationalHolidaysComponent {
  nationalHolidays!:any
  constructor(private holidayService: NationalHolidaysService) {}

    ngOnInit() {
      this.holidayService.getNationalHolidays().subscribe((data)=> {
        this.nationalHolidays = data;
        console.log(this.nationalHolidays);
      })
    }

}
