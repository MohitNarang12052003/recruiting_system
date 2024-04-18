import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    HomepageComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule,

    NgbModule
  ]
})
export class UserModule { }
