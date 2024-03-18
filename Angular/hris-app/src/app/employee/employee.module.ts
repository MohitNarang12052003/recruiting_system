import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { LeavesComponent } from './leaves/leaves.component';
import { SkillsComponent } from './skills/skills.component';
import { GoalsComponent } from './goals/goals.component';



@NgModule({
  declarations: [
    HomeComponent,
    AttendanceComponent,
    CalendarComponent,
    HolidaysComponent,
    AnnouncementsComponent,
    LeavesComponent,
    SkillsComponent,
    GoalsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmployeeModule {
  
 }
