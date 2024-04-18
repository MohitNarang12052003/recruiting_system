import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/home/users.service';
import { APP_CONSTANTS } from '../../constants/app.constants';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    // this.cookieService.deleteAll();
  }



  createForm = new FormGroup({
    email: new FormControl(),
    anything: new FormControl(),
    
  });

  submit() {
    this.userService.sendAnything(this.createForm.value).subscribe((data) => {
      console.log('here');
      alert(
        "Your Request has been sent,Thankyouuu!!!"
      );
      this.createForm.reset();
      
    });
  }
}
