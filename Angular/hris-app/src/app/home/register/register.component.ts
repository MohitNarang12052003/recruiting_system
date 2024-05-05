import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RegisterDashboardComponent } from '../register-dashboard/register-dashboard.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isDone: number = 0;
  imageUrl: any;
  submitBtn = false;
  disabled!: true;
  hide = true;
  hide1 = true;
  display!: any;
  show!: boolean;

  constructor(
    private userService: UsersService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  createForm = new FormGroup({
    full_name: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    dob: new FormControl(),
    phone: new FormControl(),
    work_exp: new FormControl(),
    resume: new FormControl(),
    exp_ctc: new FormControl(),
    curr_ctc: new FormControl(),
    cpassword: new FormControl(),
  });

  checkButton() {
    if (this.userService.active > 1) return true;

    return false;
  }

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
  toggleVisibility1(): void {
    this.hide1 = !this.hide1;
  }

  callOnSubmit() {
    if (!this.isDone) {
      this.alreadyExistsFn();
    } else if (this.submitBtn) {
      this.submit();
    }
  }

  onChange(e: any) {
    this.createForm.get('work_exp')?.setValue(e.target.value);
  }

  uploadFile(): void {
    this.userService
      .uploadFile(this.imageUrl, 'resume', this.cookieService.get('user_id'))
      .subscribe((data) => {
        this.userService.setActive();
        this.disabled = true;
      });
  }

  loginUser(em: string, pw: string): void {
    this.userService.loginUser({ email: em, pwd: pw }).subscribe((data) => {
      this.cookieService.set('user_id', data.user_id.toString());
      this.uploadFile();
    });
  }

  insertUser(): void {
    this.userService.insertUser(this.createForm.value).subscribe((data) => {
      const em = this.createForm.get('email')?.value;
      const pw = this.createForm.get('password')?.value;
      if (em !== null && pw !== null) {
        this.cookieService.set('email', em.toString());
        this.cookieService.set('pwd', pw.toString());
      }

      this.loginUser(em, pw);
    });
  }
  submit(): void {
    this.insertUser();
  }

  read(event: any) {
    this.imageUrl = event.target.files[0];
    this.createForm.patchValue({
      resume: event.target.files[0].name,
    });
  }

  alreadyExistsFn() {
    this.userService
      .alreadyExists(
        this.createForm.get('username')?.value,
        this.createForm.get('email')?.value
      )
      .subscribe((data) => {
        if (data['already_exists'] == 1) {
          this.openToast();
          this.display = 1;
        }
        if (data['already_exists'] == 2) {
          this.openToast();
          this.display = 2;
        }
        if (data['already_exists'] == 3) {
          this.openToast();
          this.display = 3;
        }
        if (data['already_exists'] == 0) {
          this.isDone = 1;
        }
      });
  }
}
