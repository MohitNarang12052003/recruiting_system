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
  grade: any[] = [''];
  selectedAdmissionType = '';
  selectedCompletionType = '';
  selectedGradeType = '';

  constructor(
    private userService: UsersService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.checkButton();
    this.populateYears();
  }

  createForm = new FormGroup({
    uid: new FormControl(),
    deg: new FormControl(),
    institute: new FormControl(),
    admission_yr: new FormControl(),
    completion_yr: new FormControl(),
    gpa: new FormControl(),
  });

  checkButton() {
    if (this.userService.active > 2) return true;
    return false;
  }

  
  populateYears(): void {
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1950; year--) {
      this.years.push(year);
    }
  }

  populateCGPA(): void {
    const grade = 10.0;

    for (let gpa = grade; gpa >= 0.0; gpa -= 0.1) {
      const roundedGPA = Math.round(gpa * 10) / 10;
      this.grade.push(roundedGPA);
    }
  }

  populatePercentage(): void {
    const grade = 100;

    for (let gpa = grade; gpa >= 0; gpa -= 1) {
      this.grade.push(gpa);
    }
  }
  onGradeChange(e: any) {
    this.grade= [''];
    const gradeFormat=e.target.value;
    if(gradeFormat==="percentage")  this.populatePercentage();
    else  this.populateCGPA()
  }

  onAdmissionSelected(value: string): void {
    this.selectedAdmissionType = value;
  }
  onCompletionSelected(value: string): void {
    this.selectedCompletionType = value;
  }
  onGradeSelected(value: string): void {
    this.selectedGradeType = value;
  }

  insertQualification(done: number): void {
    this.userService
      .insertQualification(this.createForm.value)
      .subscribe((data) => {
        if (done == 1) {
          this.userService.setActive();
        }
        this.createForm.reset();
      });
  }

  add(): void {
    this.submit(0);
  }

  submit(done: number): void {
    this.createForm
      .get('uid')
      ?.setValue(parseInt(this.cookieService.get('user_id')));

    this.createForm
      .get('admission_yr')
      ?.setValue(this.selectedAdmissionType);
    this.createForm
      .get('completion_yr')
      ?.setValue(this.selectedCompletionType);

    this.createForm.get('gpa')?.setValue(parseFloat(this.selectedGradeType));

    this.insertQualification(done);
  }
}
