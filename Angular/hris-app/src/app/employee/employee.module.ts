import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './emp_home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { LeavesComponent } from './leaves/leaves.component';
import { SkillsComponent } from './skills/skills.component';
import { GoalsComponent } from './goals/goals.component';
import { ChartComponent } from './chart/chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApplyLeavesComponent } from './apply-leaves/apply-leaves.component';
import { AgChartsAngular } from 'ag-charts-angular';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    HolidaysComponent,
    AnnouncementsComponent,
    LeavesComponent,
    SkillsComponent,
    GoalsComponent,
    ChartComponent,
    ApplyLeavesComponent,
     ],
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    NgbModule,
    AgChartsAngular
],

})
export class EmployeeModule {}
