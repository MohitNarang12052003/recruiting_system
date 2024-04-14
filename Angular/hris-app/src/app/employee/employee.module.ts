import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './emp_home/home.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { LeavesComponent } from './leaves/leaves.component';
import { SkillsComponent } from './skills/skills.component';
import { GoalsComponent } from './goals/goals.component';
import { ChartComponent } from './chart/chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    AttendanceComponent,
    CalendarComponent,
    HolidaysComponent,
    AnnouncementsComponent,
    LeavesComponent,
    SkillsComponent,
    GoalsComponent,
    ChartComponent,
<<<<<<< HEAD
  ],
  imports: [CommonModule],
  exports: [AttendanceComponent]
=======
     ],
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule
],

>>>>>>> 2a7e8d3ddb32ebc1dccc3446ad316fdd4a401668
})
export class EmployeeModule {}
