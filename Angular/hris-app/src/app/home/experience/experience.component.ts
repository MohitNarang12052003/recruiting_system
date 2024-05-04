import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit{
  selectedType = '';
  disabled!:boolean;
  years: any[] = [''];
  selectedAdmissionType = '';
  selectedCompletionType= '';
  onSelected(value: string): void {
    this.selectedType = value;
  }

  constructor(
    private router: Router,
    private userService: UsersService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.checkButton();
    this.populateYears();
  }
  createForm = new FormGroup({
    uid: new FormControl(),
    jtitle: new FormControl(),
    cname: new FormControl(),
    fyear: new FormControl(),
    tyear: new FormControl(),
    desc: new FormControl(),
  });

  populateYears() {
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1950; year--) {
      this.years.push(year);
    }
  }

  onAdmissionSelected(value: string): void {
    this.selectedAdmissionType = value;
  }
  onCompletionSelected(value: string): void {
    this.selectedCompletionType = value;
  }

  checkButton(){
    if(this.userService.active>3) return true;
    return false;
  }

  add() {
    this.submit(0);
    this.createForm.reset();
  }

  submit(done: number) {
    this.createForm
      .get('uid')
      ?.setValue(parseInt(this.cookieService.get('user_id')));
      this.createForm.get('fyear')?.setValue( parseInt(this.selectedAdmissionType));
      this.createForm.get('tyear')?.setValue( parseInt(this.selectedCompletionType));
    this.userService
      .insertJobHistory(this.createForm.value)
      .subscribe((data) => {
        if (done == 1) {
          // this.router.navigate(['General']);
          this.userService.setActive();
          this.disabled=true;
        }
      });
  }


  setActive(){
    this.userService.setActive();
    this.disabled=true;
  }
}
