import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css'],
})
export class QualificationComponent {
  isDone: number = 0;

  constructor(
    private userService: UsersService,
    private router: Router,
    private cookieService: CookieService
  ) {}
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
    this.createForm.reset();
  }

  loginForm = new FormGroup({
    email: new FormControl(this.cookieService.get('email')),
    pwd: new FormControl(this.cookieService.get('pwd')),
  });

  submit(done: number): void {
    this.userService.loginUser(this.loginForm.value).subscribe((data) => {
      console.log(data);
      this.cookieService.set('user_id', data.user_id);
    });
    this.createForm
      .get('uid')
      ?.setValue(parseInt(this.cookieService.get('user_id')));
    this.userService
      .insertQualification(this.createForm.value)
      .subscribe((data) => {
        if (done == 1) this.router.navigate(['Experience']);
      });
  }
}
