import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css'],
})
export class QualificationComponent implements OnInit {
  isDone: number = 0;
  disabled!: boolean;
  years: any[] = [''];
  grade:any[]=[''];

  constructor(
    private userService: UsersService,
    private router: Router,
    private cookieService: CookieService,
    
  ) {}
  ngOnInit(): void {
    this.checkButton();
    this.populateYears();
    this.populateGrade();
  }

  checkButton(){
    if(this.userService.active>2) return true;
    return false;
  }

  createForm = new FormGroup({
    uid: new FormControl(),
    deg: new FormControl(),
    institute: new FormControl(),
    admission_yr: new FormControl(),
    completion_yr: new FormControl(),
    gpa: new FormControl(),
  });

  add(): void {
    this.submit(0);
    
  }
  populateYears() {
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1950; year--) {
      this.years.push(year);
    }
  }

  populateGrade() {
    const grade =10.0;

    for (let gpa = grade; gpa >= 0.0; gpa-=0.1) {
      const roundedGPA = Math.round(gpa * 10) / 10;
      this.grade.push(roundedGPA);
    }
  }

  selectedAdmissionType = '';
  selectedCompletionType= '';
  selectedGradeType='';

  onAdmissionSelected(value: string): void {
    this.selectedAdmissionType = value;
  }
  onCompletionSelected(value: string): void {
    this.selectedCompletionType = value;
  }
  onGradeSelected(value: string): void {
    this.selectedGradeType = value;
  }


  // loginForm = new FormGroup({
  //   email: new FormControl(this.cookieService.get('email')),
  //   pwd: new FormControl(this.cookieService.get('pwd')),
  // });

  submit(done: number): void {
    // this.userService.loginUser(this.loginForm.value).subscribe((data) => {
    //   console.log(data);
    //   this.cookieService.set('user_id', data.user_id);
    // });
    this.createForm
      .get('uid')
      ?.setValue(parseInt(this.cookieService.get('user_id')));

    this.createForm.get('admission_yr')?.setValue( parseInt(this.selectedAdmissionType));
    this.createForm.get('completion_yr')?.setValue( parseInt(this.selectedCompletionType));
    this.createForm.get('gpa')?.setValue( parseInt(this.selectedGradeType))
    this.userService
      .insertQualification(this.createForm.value)
      .subscribe((data) => {
        // if (done == 1) this.router.navigate(['Experience']);
        if (done == 1){
          this.userService.setActive();
        }
        this.createForm.reset();
      });
  }
}
