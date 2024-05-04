import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  show: boolean = false;
  display!: any;

  constructor(
    private userService: UsersService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {}

  openToast() {
    this.show = true;
  }

  closeToast() {
    this.show = false;
    this.display = 0;
  }

  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  createForm = new FormGroup({
    email: new FormControl(),
    pwd: new FormControl(),
    forgot_pwd: new FormControl(),
  });

  loginUser(): void {
    this.userService.loginUser(this.createForm.value).subscribe((data) => {
      this.cookieService.set('email', data['email']);
      this.cookieService.set('token', data['token']);
      this.cookieService.set('time_to_expire', data['time_to_expire']);
      this.cookieService.set('role', data['role']);

      if (data['role'] == APP_CONSTANTS.USER_ROLE) {
        this.cookieService.set('user_id', data['user_id']);
        this.router.navigate(['/']);
      } else if (data['role'] == APP_CONSTANTS.EMP_ROLE) {
        this.cookieService.set('employee_id', data['employee_id']);
        this.router.navigate(['Employee']);
      } else if (data['role'] == APP_CONSTANTS.HR_ROLE) {
        this.cookieService.set('hr_id', data['hr_id']);
        this.router.navigate(['HR']);
      } else {
        this.createForm.reset();
        this.display = 1;
        this.openToast();
      }
    });
  }

  submit() {
    this.loginUser();
  }
}
