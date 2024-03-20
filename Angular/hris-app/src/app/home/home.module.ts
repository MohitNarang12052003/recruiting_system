import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QualificationComponent } from './qualification/qualification.component';
import { ExperienceComponent } from './experience/experience.component';
import { AppRoutingModule } from '../app-routing.module';
import { GeneralComponent } from './general/general.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PhotoComponent } from './photo/photo.component';
import { JobComponent } from './job/job.component';
import { SinglejobComponent } from './singlejob/singlejob.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { UploadSuccessComponent } from './upload-success/upload-success.component';
import { NationalHolidaysComponent } from './national-holidays/national-holidays.component';

@NgModule({
  declarations: [
    HeroComponent,
    LoginComponent,
    RegisterComponent,
    QualificationComponent,
    ExperienceComponent,
    GeneralComponent,
    PhotoComponent,
    JobComponent,
    SinglejobComponent,
    AboutUsComponent,
    UserLoginPageComponent,
    UploadSuccessComponent,
    NationalHolidaysComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  exports: [
    PhotoComponent,
    AboutUsComponent,
    NationalHolidaysComponent],
})
export class HomeModule {}
