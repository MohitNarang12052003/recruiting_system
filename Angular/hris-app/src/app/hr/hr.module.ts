import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrhomeComponent } from './hrhome/hrhome.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ViewApplicantsComponent } from './view-applicants/view-applicants.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { ViewVacanciesComponent } from './view-vacancies/view-vacancies.component';
import { SingleApplicantComponent } from './single-applicant/single-applicant.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';
import { NextRoundEmailComponent } from './next-round-email/next-round-email.component';
import { CreateNewEmployeeComponent } from './create-new-employee/create-new-employee.component';



@NgModule({
  declarations: [
    HrhomeComponent,
    AddJobComponent,
    ViewApplicantsComponent,
    ViewEmployeesComponent,
    ViewVacanciesComponent,
    SingleApplicantComponent,
    SingleEmployeeComponent,
    NextRoundEmailComponent,
    CreateNewEmployeeComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  exports:[
    AddJobComponent
  ]
})
export class HrModule { }
