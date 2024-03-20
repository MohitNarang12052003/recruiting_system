import { Component } from '@angular/core';
import { AttendanceServiceService } from '../attendance-service.service';
import { DatePipe, DatePipeConfig } from '@angular/common';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  data!:any;
  constructor(private attendanceService: AttendanceServiceService) {}
  submit():void {
    this.attendanceService.markAttendance().subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
}
