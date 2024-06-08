import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userid!: any;
  empid!: any;
  hr!: any;
  role!: boolean;
  loggedIn!:boolean
  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.isLoggedIn();
   }

 

  isLoggedIn(): boolean {
    const role = !!this.cookieService.get('role');
    this.userid = this.cookieService.get('user_id');
    this.empid = !!this.cookieService.get('employee_id');
    this.hr = !!this.cookieService.get('hr_id');
    this.role = !!this.cookieService.get('role');
    const loggedIn = (this.userid || this.empid || this.hr) && role;
    
    return loggedIn;
  }

  logOut() {
    this.cookieService.deleteAll();
  }
}
