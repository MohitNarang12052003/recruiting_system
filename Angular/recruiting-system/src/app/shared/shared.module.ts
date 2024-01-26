import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HeroSectionComponent } from './Components/hero-section/hero-section.component';
import { AboutComponent } from './Components/about/about.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ProfileComponent,
    HeroSectionComponent,
    AboutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
