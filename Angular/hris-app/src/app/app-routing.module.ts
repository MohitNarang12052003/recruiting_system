import { NgModule } from '@angular/core';

import { RouterModule,Routes } from '@angular/router';
import { HeroComponent } from './home/hero/hero.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { QualificationComponent } from './home/qualification/qualification.component';
import { ExperienceComponent } from './home/experience/experience.component';
import { GeneralComponent } from './home/general/general.component';
import { PhotoComponent } from './home/photo/photo.component';
import { HomeComponent } from './employee/home/home.component';
import { HrhomeComponent } from './hr/hrhome/hrhome.component';
import { SinglejobComponent } from './home/singlejob/singlejob.component';
import { AddJobComponent } from './hr/add-job/add-job.component';
import { ViewApplicantsComponent } from './hr/view-applicants/view-applicants.component';



const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'Qualification',
    component:QualificationComponent
  },
  {
    path:'Experience',
    component:ExperienceComponent
  },
  {
    path:'General',
    component:GeneralComponent
  },
  {
    path:'Photo',  
    component:PhotoComponent
  },
  {
    path:'Employee',
    component:HomeComponent
  },
  {
    path:'HR',
    component:HrhomeComponent
  },
  {
    path:'jobDetail',
    component:SinglejobComponent
  },
  {
    path:'PostJob',
    component:AddJobComponent
  },
  {
    path:'ViewApplications',
    component:ViewApplicantsComponent
  },
  {
    path:'',
    component:HeroComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
