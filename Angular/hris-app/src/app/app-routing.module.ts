import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './home/hero/hero.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { QualificationComponent } from './home/qualification/qualification.component';
import { ExperienceComponent } from './home/experience/experience.component';
import { GeneralComponent } from './home/general/general.component';
import { PhotoComponent } from './home/photo/photo.component';
import { HomeComponent } from './employee/emp_home/home.component';
import { HrhomeComponent } from './hr/hrhome/hrhome.component';
import { SinglejobComponent } from './home/singlejob/singlejob.component';
import { AddJobComponent } from './hr/add-job/add-job.component';
import { ViewApplicantsComponent } from './hr/view-applicants/view-applicants.component';
import { ViewEmployeesComponent } from './hr/view-employees/view-employees.component';
import { ViewVacanciesComponent } from './hr/view-vacancies/view-vacancies.component';
import { SingleApplicantComponent } from './hr/single-applicant/single-applicant.component';
import { EmployeeGuardService } from './employee/employee-guard.service';
import { HRGuardService } from './hr/hrguard.service';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { SingleEmployeeComponent } from './hr/single-employee/single-employee.component';
import { HomepageComponent } from './user/homepage/homepage.component';
import { UserGuardService } from './user/user-guard.service';
import { ForgotPwdComponent } from './home/forgot-pwd/forgot-pwd.component';
import { NextRoundEmailComponent } from './hr/next-round-email/next-round-email.component';
import { OriginalDocumentsComponent } from './home/original-documents/original-documents.component';
import { CreateNewEmployeeComponent } from './hr/create-new-employee/create-new-employee.component';
import { ChangePwdComponent } from './shared/components/change-pwd/change-pwd.component';
import { AddAnnouncementComponent } from './hr/add-announcement/add-announcement.component';
import { AttendanceComponent } from './employee/attendance/attendance.component';
import { CalendarComponent } from './employee/calendar/calendar.component';
import { NationalHolidaysComponent } from './home/national-holidays/national-holidays.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'Qualification',
    component: QualificationComponent,
  },
  {
    path: 'Experience',
    component: ExperienceComponent,
  },
  {
    path: 'General',
    component: GeneralComponent,
  },
  {
    path: 'Photo',
    component: PhotoComponent,
  },
  {
    path: 'Employee',
    component: HomeComponent,
    canActivate: [EmployeeGuardService],
  },
  {
    path: 'HR',
    component: HrhomeComponent,
    canActivate: [HRGuardService],
  },
  {
    path: 'jobDetail',
    component: SinglejobComponent,
  },
  {
    path: 'PostJob',
    component: AddJobComponent,
    canActivate: [HRGuardService],
  },
  {
    path: 'ViewApplications',
    component: ViewApplicantsComponent,
    canActivate: [HRGuardService],
  },

  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [UserGuardService],
  },
  {
    path: 'forgot-pwd',
    component: ForgotPwdComponent,
  },
  {
    path: 'ViewEmployees',
    component: ViewEmployeesComponent,
    canActivate: [HRGuardService],
  },
  {
    path: 'ViewVacancies',
    component: ViewVacanciesComponent,
    canActivate: [HRGuardService],
  },
  {
    path: 'SingleApplicantDetails/:id',
    component: SingleApplicantComponent,
    canActivate: [HRGuardService],
  },
  {
    path: 'SingleEmployeeDetails/:id',
    component: SingleEmployeeComponent,
    canActivate: [HRGuardService],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'next-round-email/:id',
    component: NextRoundEmailComponent,
    canActivate: [HRGuardService],
  },
  {
    path: 'original-documents',
    component: OriginalDocumentsComponent,
  },
  {
    path: 'create-new-employee/:id',
    component: CreateNewEmployeeComponent,
    canActivate: [HRGuardService],
  },
  {
    path: 'change-pwd',
    component: ChangePwdComponent,
  },
  {
    path: 'AddAnnouncement',
    component: AddAnnouncementComponent,
  },
  {
    path: '',
    component: HeroComponent,
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  }
,
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path:'nationalHolidays',
    component:NationalHolidaysComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
