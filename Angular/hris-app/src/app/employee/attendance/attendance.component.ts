import { Component } from '@angular/core';
import { AttendanceServiceService } from '../attendance-service.service';
import { DatePipe, DatePipeConfig } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  data!:any;
  employeeId!:any;
  constructor(private attendanceService: AttendanceServiceService, private cookieService: CookieService) {}
  submit():void {
    this.attendanceService.markAttendance(this.employeeId).subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
    // clockedIn: boolean = false;

    // clockIn() {
    //   this.attendanceService.markAttendance(this.employeeId).subscribe((data) => {
    //     console.log(data);
    //     this.data = data;
    //     this.clockedIn = true;
    // })};
    // clockOut() {
    //     this.clockedIn = false;
    // }
  ngOnInit():void {
    this.employeeId=this.cookieService.get("employee_id")
  }
}
