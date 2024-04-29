import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { OriginalDocumentsComponent } from './original-documents/original-documents.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetHiredComponent } from './get-hired/get-hired.component';
import { CategoryComponent } from './category/category.component';
import { WhatWeOfferComponent } from './what-we-offer/what-we-offer.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { SharedModule } from '../shared/shared.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { OverviewComponent } from './overview/overview.component';
import { FilterComponent } from './filter/filter.component';
import { RegisterDashboardComponent } from './register-dashboard/register-dashboard.component';



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
    OriginalDocumentsComponent,
    GetHiredComponent,
    CategoryComponent,
    WhatWeOfferComponent,
    TestimonialsComponent,
    OverviewComponent,
    FilterComponent,
    RegisterDashboardComponent,
    
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbDatepickerModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    DatePipe,
    NgbCarouselModule,

  ],

  exports: [PhotoComponent,CategoryComponent],
})
export class HomeModule {}
