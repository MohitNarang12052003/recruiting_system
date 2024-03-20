import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AttendanceComponent } from './attendance/attendance.component';



@NgModule({
  declarations: [
    HomeComponent,
    AttendanceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AttendanceComponent
  ]
})
export class EmployeeModule { }
