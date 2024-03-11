import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
})
export class GeneralComponent {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {}
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
  onChange(e:any) {
    console.log(e.target.value)
    this.createForm.get("gender")?.setValue(e.target.value) ;
 }
  submit() {
    this.createForm.get("uid")?.setValue(parseInt(this.cookieService.get("user_id")))
    this.userService
      .insertadditionalInfo(this.createForm.value)
      .subscribe((data) => {
        this.router.navigate(['Photo']);
      });
  }
}
