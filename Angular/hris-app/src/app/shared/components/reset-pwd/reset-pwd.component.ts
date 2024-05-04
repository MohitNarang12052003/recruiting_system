import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css'],
})
export class ResetPwdComponent {
  resetPwdForm!: FormGroup;
  hidden!: boolean;
  fpToken!: any;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //valid fp token and tte
    this.getToken();

    this.resetPwdFormFn();
  }

  getToken() {
    this.route.paramMap.subscribe((value) => {
      this.fpToken = value.get('token');

      this.validateFpToken();
    });
  }

  validateFpToken(): void {
    this.sharedService.validateFpToken(this.fpToken).subscribe({
      next: (value) => {},
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  resetPwdFormFn(): void {
    this.resetPwdForm = new FormGroup({
      new_pwd: new FormControl(),
      confirm_new_pwd: new FormControl(),
      token: new FormControl(),
    });
  }

  submit(): void {
    this.sharedService.validateFpToken(this.fpToken).subscribe({
      next: (value) => {
        this.resetPwnFn();
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  resetPwnFn() {
    this.resetPwdForm.patchValue({
      token: this.fpToken,
    });

    this.sharedService.resetPwd(this.resetPwdForm.value).subscribe({
      next: (data) => {},
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }
}
