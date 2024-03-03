import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private cookieService:CookieService){}

  ngOnInit(){

    this.isLoggedIn()
    


  }

  isLoggedIn():boolean{
    const userid= !!this.cookieService.get('userid');
    const employee_id=!!this.cookieService.get('employee_id');
    const hr_id=!!this.cookieService.get('hr_id');
    
    const loggedIn= (userid || employee_id || hr_id);

    return loggedIn;
  }

  logOut(){
      this.cookieService.deleteAll();

  }

  

}
