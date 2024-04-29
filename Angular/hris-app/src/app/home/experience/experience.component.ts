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
  }
  createForm = new FormGroup({
    uid: new FormControl(),
    jtitle: new FormControl(),
    cname: new FormControl(),
    fyear: new FormControl(),
    tyear: new FormControl(),
    desc: new FormControl(),
  });

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
