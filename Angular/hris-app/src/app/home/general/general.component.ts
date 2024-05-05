import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
})
export class GeneralComponent implements OnInit {
  disabled!: boolean;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.checkButton();
  }
  createForm = new FormGroup({
    uid: new FormControl(),
    gender: new FormControl(),
    nationality: new FormControl(),
    address: new FormControl(),
    state: new FormControl(),
    city: new FormControl(),
    pincode: new FormControl(),
    marital_status: new FormControl(),
  });
  onGenderChange(e: any) {
    this.createForm.get('gender')?.setValue(e.target.value);
  }

  onMaritalChange(e: any) {
    this.createForm.get('marital_status')?.setValue(e.target.value);
  }
  checkButton() {
    if (this.userService.active > 4) return true;
    return false;
  }

  insertAdditionalInfoFn(): void {
    this.userService
      .insertadditionalInfo(this.createForm.value)
      .subscribe((data) => {
        this.userService.setActive();
      });
  }
  submit() {
    this.createForm
      .get('uid')
      ?.setValue(parseInt(this.cookieService.get('user_id')));
    this.insertAdditionalInfoFn();
  }
}
