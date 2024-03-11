import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeModule } from './employee/employee.module';
import { HrModule } from './hr/hr.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule, HomeModule,  EmployeeModule, HrModule,NgbModule,UserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
