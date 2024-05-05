import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css'],
})
export class ChangePwdComponent implements OnInit {
  changePwdForm!: FormGroup;
  show: boolean = false;
  display!: any;
  hide = true;
  hide1 = true;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.changePwdFormFn();
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

  changePwdFormFn(): void {
    this.changePwdForm = new FormGroup({
      old_pwd: new FormControl(),
      new_pwd: new FormControl(),
      confirm_new_pwd: new FormControl(),
    });
  }

  changePwdFn(): void {
    this.sharedService.changePwd(this.changePwdForm.value).subscribe({
      next: (data) => {
        this.openToast();
        this.display = 2;
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  submit(): void {
    if (
      this.changePwdForm.get('new_pwd')?.value ==
      this.changePwdForm.get('confirm_new_pwd')?.value
    ) {
      this.changePwdFn();
    } else {
      this.openToast();
      this.display = 1;
    }
  }
}
